// /app/api/nepali-finance/route.ts

import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import Parser from "rss-parser";

type NewsItem = {
  id: string;
  source: string;
  title: string;
  link: string;
  date?: string | null;
  excerpt?: string | null;
};

const parser = new Parser();

// In-memory cache (per server instance)
let cache: { ts: number; items: NewsItem[] } | null = null;
const TTL = Number(process.env.NEWS_CACHE_TTL_SECONDS || "600"); // in seconds (default 10 min)

// Keyword filter for business/finance
const BUSINESS_KEYWORDS = [
  "business", "finance", "economy", "market", "stock",
  "share", "investment", "bank", "banking", "budget",
  "अर्थ", "अर्थतन्त्र", "अर्थिक", "बिजनेस", "व्यापार",
  "पूँजी", "लगानी", "शेयर", "धितोपत्र", "बैंक", "बजेट",
  "व्यापारिक", "बजार", "मुद्रा", "मुद्रा नीति", "ब्याज"
];

function isBusinessNews(title: string = "", excerpt: string = ""): boolean {
  const text = (title + " " + excerpt).toLowerCase();
  return BUSINESS_KEYWORDS.some((key) => text.includes(key.toLowerCase()));
}

function makeId(src: string, title: string, link: string): string {
  // simple stable-ish ID
  return `${src}-${Buffer.from(title + (link || "")).toString("base64").slice(0, 12)}`;
}

// --- RSS fetcher ---
async function fetchRSS(url: string, source: string): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(url);
    return (feed.items || []).slice(0, 8).map((it) => ({
      id: makeId(source, it.title || "", it.link || ""),
      source,
      title: it.title || "Untitled",
      link: it.link || "#",
      date: it.pubDate || null,
      excerpt: it.contentSnippet || null,
    }));
  } catch (e) {
    console.warn(`RSS fetch failed for ${source}:`, e);
    return [];
  }
}

// --- Scraper for OnlineKhabar or similar site ---
async function fetchFromPage(pageUrl: string, source: string): Promise<NewsItem[]> {
  try {
    const { data } = await axios.get(pageUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; NewsFetcher/1.0)" },
      timeout: 10_000,
    });
    const $ = cheerio.load(data);
    const items: NewsItem[] = [];

    // adapt these selectors based on actual site structure
    $("article, .ok-news-post, .news-list__item, .teaser-wrapper, .story").each((_, el) => {
      const a = $(el).find("h2 a, a");
      let title = a.text().trim();
      if (!title) {
        title = $(el).find("h2").text().trim();
      }
      let link = a.attr("href") || "";
      if (link && !link.startsWith("http")) {
        const base = new URL(pageUrl).origin;
        link = `${base}${link}`;
      }
      if (title && link) {
        items.push({
          id: makeId(source, title, link),
          source,
          title,
          link,
        });
      }
    });

    return items;
  } catch (e) {
    console.warn(`Scrape failed for ${source} at ${pageUrl}:`, e);
    return [];
  }
}

// --- Combine all sources ---
async function fetchAllNews(): Promise<NewsItem[]> {
  const sources = [
    fetchRSS("https://kathmandupost.com/business/rss", "Kathmandu Post"),
    fetchRSS("https://myrepublica.nagariknetwork.com/category/business/feed", "MyRepublica"),
    fetchRSS("https://www.setopati.com/economy/feed", "Setopati"),

    fetchFromPage("https://www.onlinekhabar.com/content/economy", "OnlineKhabar"),
    fetchFromPage("https://www.onlinekhabar.com/content/business", "OnlineKhabar"),
    fetchFromPage("https://ekantipur.com/ekonomi", "Ekantipur"),
    fetchFromPage("https://ekantipur.com/business", "Ekantipur"),
  ];

  const results = await Promise.all(sources);
  const flat = results.flat();

  // Deduplicate by link
  const map = new Map<string, NewsItem>();
  for (const it of flat) {
    const key = it.link || it.id;
    if (!map.has(key)) {
      map.set(key, it);
    }
  }
  let list = Array.from(map.values());

  // Optionally filter by title/excerpt keywords
  list = list.filter((item) =>
    isBusinessNews(item.title, item.excerpt || "")
  );

  // Sort by date if available
  list.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  return list.slice(0, 40);
}

// --- API handler ---
export async function GET(req: Request) {
  const url = new URL(req.url);
  const force = url.searchParams.get("forceRefresh") === "1";

  const now = Date.now();
  if (!force && cache && now - cache.ts < TTL * 1000) {
    return NextResponse.json({ source: "cache", ttl: TTL, items: cache.items });
  }

  try {
    const items = await fetchAllNews();
    cache = { ts: now, items };
    return NextResponse.json({ source: "fresh", ttl: TTL, items });
  } catch (e) {
    console.error("Failed to fetch news:", e);
    if (cache) {
      return NextResponse.json({ source: "stale-cache", ttl: TTL, items: cache.items });
    }
    return NextResponse.json({ source: "error", items: [] }, { status: 500 });
  }
}

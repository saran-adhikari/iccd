// components/news/useNepaliNews.tsx
"use client";
import { useEffect, useState, useRef } from "react";

export type NewsItem = {
  id: string;
  source: string;
  title: string;
  link: string;
  date?: string | null;
  excerpt?: string | null;
};

export function useNepaliNews({ url = "/api/nepali-finance", refreshInterval = 300_000 } = {}) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const etagRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function fetchNow(force = false) {
    setLoading(true);
    setError(null);
    try {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const resp = await fetch(`${url}${force ? "?forceRefresh=1" : ""}`, {
        signal: controller.signal,
        cache: "no-store",
      });
      if (!resp.ok) throw new Error(`Status ${resp.status}`);
      const json = await resp.json();
      if (Array.isArray(json.items)) {
        setNews((prev) => {
          // quick dedupe by link
          const map = new Map(prev.concat(json.items).map((i: any) => [i.link || i.id, i]));
          return Array.from(map.values()).slice(0, 40);
        });
      }
    } catch (e: any) {
      if (e.name === "AbortError") return;
      console.error("news fetch error", e);
      setError(String(e?.message || "Failed to fetch news"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNow();
    const id = setInterval(() => fetchNow(), refreshInterval);
    return () => {
      clearInterval(id);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [url, refreshInterval]);

  return { news, loading, error, refresh: () => fetchNow(true) };
}


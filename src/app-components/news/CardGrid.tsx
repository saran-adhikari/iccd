// components/news/CardGrid.tsx
"use client";
import Link from "next/link";
import { useNepaliNews } from "./useNepaliNews";

export default function CardGrid({ cols = 3 }: { cols?: number }) {
  const { news, loading, error, refresh } = useNepaliNews({ refreshInterval: 300000 });

  return (
    <section className="mt-10 w-[80%] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white ">Recent Finance News</h2>
        <button
          onClick={() => refresh()}
          className="text-sm px-3 py-1 border border-white rounded hover:bg-secondary hover:border-secondary/40 hover:text-white cursor-pointer"
        >
          Refresh
        </button>
      </div>

      {loading && <div className="grid gap-4 md:grid-cols-3">{Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="p-4 border rounded animate-pulse h-28" />
      ))}</div>}

      {error && <div className="text-red-600">Error: {error}</div>}

      {!loading && !error && (
        <div className={`grid gap-4 sm:grid-cols-1 md:grid-cols-${cols}`}>
          {news.slice(0, 12).map((n) => (
            <article key={n.id || n.link} className="p-4 border border-primary/40 rounded-xl bg-none shadow-sm hover:bg-primary/20 cursor-pointer">
              <a href={n.link} target="_blank" rel="noreferrer" className="font-semibold text-white">
                {n.title}
              </a>
              <div className="text-xs text-gray-500 mt-1">
                {n.source} {n.date ? `· ${new Date(n.date).toLocaleString()}` : ""}
              </div>
              {n.excerpt && <p className="mt-2 text-sm text-gray-700 truncate">{n.excerpt}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

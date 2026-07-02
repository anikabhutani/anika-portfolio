"use client";

import { useEffect, useState } from "react";
import type { ReadingItem } from "@/types/project";

export default function ReadingWidget() {
  const [items, setItems] = useState<ReadingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reading")
      .then((r) => r.json())
      .then((data: { items: ReadingItem[] }) => {
        if (!cancelled) setItems(data.items || []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-white border border-border rounded-sm p-6">
      <div className="text-[0.75rem] tracking-[0.1em] uppercase text-sky font-medium mb-5">
        What I&apos;m reading
      </div>

      {loading ? (
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-16 bg-off rounded" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-[0.85rem] text-light italic">Nothing on the nightstand right now.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {items.map((book) => (
            <div key={book.id} className="flex gap-4">
              <div className="w-12 h-16 rounded bg-off border border-border flex-shrink-0 overflow-hidden">
                {book.cover_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[0.92rem] text-navy leading-snug">{book.title}</div>
                <div className="text-[0.78rem] text-muted mb-1.5">{book.author}</div>
                <div className="h-1.5 bg-off rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-sky rounded-full" style={{ width: `${book.progress_pct}%` }} />
                </div>
                <p className="text-[0.78rem] text-muted italic leading-snug">{book.takeaway}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
};
type Props = { featureFlags?: { showRatings?: boolean } };

export default function ProductList({ featureFlags }: Props) {
  const [all, setAll] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(all.map((p) => p.category)))],
    [all]
  );

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto auto",
          gap: 8,
          alignItems: "center",
        }}
        role="region"
        aria-label="Filters"
      >
        <input
          placeholder="Search products…"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          aria-label="Sort by price"
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
        <button
          onClick={() => {
            setQuery("");
            setCategory("all");
            setSort("asc");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

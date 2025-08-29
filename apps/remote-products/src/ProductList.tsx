import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
};
type Props = { featureFlags?: { showRatings?: boolean } };

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get("/api/products");
  return response.data;
};

export default function ProductList({ featureFlags }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (query) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    return filtered.sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [products, query, category, sort]);

  if (isLoading) return <p>Loading products…</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

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

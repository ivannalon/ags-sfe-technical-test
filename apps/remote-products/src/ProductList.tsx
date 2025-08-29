import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "./components/ui/badge";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
};

type Props = { featureFlags?: { showRatings?: boolean } };

export default function ProductList({ featureFlags }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const pageSize = 20;

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

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

    return [...filtered].sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [products, query, category, sort]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page]);

  if (isLoading) return <p>Loading products…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Input
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex flex-row gap-4">
          <Select value={category} onValueChange={(val) => setCategory(val)}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem className="cursor-pointer" key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(val) => setSort(val as "asc" | "desc")}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="asc">
                Price: Low → High
              </SelectItem>
              <SelectItem className="cursor-pointer" value="desc">
                Price: High → Low
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setSort("asc");
              setPage(1);
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {paginatedProducts.map((p) => (
          <Card key={p.id} className="@container/card">
            <div className="w-full aspect-[4/3] rounded-t-md overflow-hidden bg-gray-100">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <CardHeader>
              <CardDescription>{p.category}</CardDescription>
              <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                ${p.price.toFixed(2)}
              </CardTitle>
              {featureFlags?.showRatings && (
                <Badge
                  variant="outline"
                  className="mt-2 flex items-center gap-1"
                >
                  {p.rating.toFixed(1)}
                </Badge>
              )}
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 font-medium">{p.name}</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          className="cursor-pointer"
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

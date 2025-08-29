import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./msw/browser";
import ProductList from "./ProductList";

function DevPage() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
      <h1 style={{ fontSize: 20 }}>Remote Products (Dev Playground)</h1>
      <ProductList featureFlags={{ showRatings: true }} />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<DevPage />);

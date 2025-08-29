import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import './msw/browser';
import ProductList from "./ProductList";

async function main() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
      <h1
        style={{ fontSize: 20 }}
        className="justify-center p-8 w-full text-center"
      >
        Remote Products (Dev Playground)
      </h1>
      <ProductList featureFlags={{ showRatings: true }} />
    </div>
  );
}

main();

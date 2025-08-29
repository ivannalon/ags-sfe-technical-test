import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { worker } from "./msw/browser";
import ProductList from "./ProductList";

const queryClient = new QueryClient();

async function init() {
  if (process.env.NODE_ENV === "development") {
    await worker.start({
      quiet: true,
      serviceWorker: { url: "/mockServiceWorker.js" },
      onUnhandledRequest: "bypass",
    });
  }

  const root = createRoot(document.getElementById("root")!);
  root.render(
    <QueryClientProvider client={queryClient}>
      <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
        <h1 style={{ fontSize: 20 }}>Remote Products (Dev Playground)</h1>
        <ProductList featureFlags={{ showRatings: true }} />
      </div>
    </QueryClientProvider>
  );
}

init();

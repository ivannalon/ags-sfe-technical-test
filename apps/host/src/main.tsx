import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./msw/browser";

const ProductList = React.lazy(() => import("products/ProductList"));

function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20 }}>Catalog Shell (Host)</h1>
        <small>Vite • Standalone Module Federation • React 19</small>
      </header>
      <main style={{ marginTop: 16 }}>
        <h1
          style={{ fontSize: 20 }}
          className="justify-center p-8 w-full text-center"
        >
          Host Application{" "}
        </h1>
        <Suspense fallback={<p>Loading remote products...</p>}>
          <ProductList featureFlags={{ showRatings: true }} />
        </Suspense>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

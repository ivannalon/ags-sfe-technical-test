import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/ui/button";
import "./index.css";

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
        <h1>
          Host Application{" "}
          <div className="flex min-h-svh flex-col items-center justify-center">
            <Button>Click me</Button>
          </div>
        </h1>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

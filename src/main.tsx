import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Loader from "./components/Loader";
import "./index.css";

const MIN_LOADER_MS = import.meta.env.DEV ? 0 : 1200;

function Root() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), MIN_LOADER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className={`loader-wrapper ${!showLoader ? "loader-wrapper--hidden" : ""}`} aria-hidden={!showLoader}>
        <Loader hidden={!showLoader} />
      </div>
      <StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <AuthProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </AuthProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </StrictMode>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);

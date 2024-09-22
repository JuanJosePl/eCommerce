import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import router from "./router/Router";
import "./index.css";
import ScrollToTop from "./components/atoms/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { GlobalUpdateProvider } from "./context/GlobalUpdateContext";

createRoot(document.getElementById("root")).render(
  <GlobalUpdateProvider>
    <CartProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterProvider router={router}>
          <ScrollToTop />
        </RouterProvider>
      </ThemeProvider>
    </CartProvider>
  </GlobalUpdateProvider>
);

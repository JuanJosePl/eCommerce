import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import router from "./router/Router";
import "./index.css";
import ScrollToTop from "./components/atoms/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { GlobalUpdateProvider } from "./context/GlobalUpdateContext";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <GlobalUpdateProvider>
    <CartProvider>
      <ProductProvider>
        <UserProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <RouterProvider router={router}>
              <ScrollToTop />
            </RouterProvider>
          </ThemeProvider>
        </UserProvider>
      </ProductProvider>
    </CartProvider>
  </GlobalUpdateProvider>
);

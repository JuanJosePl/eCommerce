import React, { useState } from "react";
import { useTheme } from "next-themes";
import { ShoppingCart, Search, Menu, Sun, Moon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "../molecules/Header/Logo";
import MainMenu from "../molecules/Header/MainMenu";

const MainHeader = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <form className="hidden sm:flex w-full max-w-sm items-center space-x-2">
            <input
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Buscar productos..."
              type="search"
            />
            <Button type="submit" size="sm" className="px-3">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </form>
          <Button size="sm" variant="ghost">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Carrito</span>
          </Button>
          <Button size="sm" variant="ghost" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Cambiar tema</span>
          </Button>
          <div className="hidden md:block">
            <MainMenu />
          </div>
          <Button variant="outline" size="sm" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menú</span>
          </Button>
        </div>
      </div>

      {/* Menú desplegable en dispositivos móviles */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-input p-4">
          {/* Se renderiza MainMenu con estilos para pantallas pequeñas */}
          <nav className="flex flex-col space-y-2">
            <MainMenu />
          </nav>
        </div>
      )}
    </header>
  );
};

export default MainHeader;

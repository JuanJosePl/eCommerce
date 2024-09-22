import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Search, Menu, Sun, Moon, X, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthStatus, isAdmin } from "@/helper/auth";
import Logo from "../molecules/Header/Logo";
import MainMenu from "../molecules/Header/MainMenu";
import { useCart } from "@/context/CartContext";
import CartDropdown from "../molecules/cart/CartDropdown";
import { useGlobalUpdate } from "@/context/GlobalUpdateContext";

const MainHeader = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { cartTotal, fetchCart } = useCart();
  const { triggerUpdate } = useGlobalUpdate();

  useEffect(() => {
    const checkAuthAndRole = async () => {
      const { isAuthenticated: authStatus, user } = await getAuthStatus();
      setIsAuthenticated(authStatus);
      if (authStatus) {
        const adminStatus = await isAdmin();
        setIsAdminUser(adminStatus);

        await fetchCart();
        triggerUpdate();
      }
    };
    checkAuthAndRole();
  }, [location]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background shadow-md"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <form className="hidden sm:flex w-full max-w-sm items-center space-x-2">
            <Input
              className="flex h-9"
              placeholder="Buscar productos..."
              type="search"
            />
            <Button type="submit" size="sm" className="px-3">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </form>
          <Button size="sm" variant="ghost" onClick={toggleCart}>
            <ShoppingCart className="h-5 w-5" />
            {cartTotal > 0 && (
              <span className="ml-1 text-xs font-bold">{cartTotal}</span>
            )}
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
            {isAuthenticated ? (
              <MainMenu isAdmin={isAdminUser} />
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost">Iniciar sesión</Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost">Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Menú</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-background border-t border-input p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <MainMenu isAdmin={isAdminUser} />
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="ghost" className="w-full justify-start">
                      Registrarse
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  );
};

export default MainHeader;
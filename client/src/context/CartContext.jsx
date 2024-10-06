import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import api from "@/helper/auth";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCartItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await fetchCartItems();
      setCartItems(items.filter((item) => item && item.producto));
    } catch (error) {
      console.error("Error al cargar los items del carrito:", error);
      setError(
        "No se pudo cargar el carrito. Por favor, intenta de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await api.get("/api/cart/obtener-carrito");
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error("Los datos recibidos no son un arreglo:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      throw error;
    }
  };

  const addToCart = async (productId, quantity) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/cart/agregar-carrito", {
        productoId: productId,
        cantidad: quantity,
      });
      if (Array.isArray(response.data.carrito)) {
        setCartItems(response.data.carrito);
      } else {
        throw new Error("Los datos del carrito no son un arreglo");
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error);
      setError(
        "No se pudo añadir el producto al carrito. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.delete(
        `/api/cart/eliminar-carrito/${productId}`
      );
      if (Array.isArray(response.data.carrito)) {
        setCartItems(response.data.carrito);
      } else {
        throw new Error("Los datos del carrito no son un arreglo");
      }
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
      setError(
        "No se pudo eliminar el producto del carrito. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put(`/api/cart/actualizar-cantidad`, {
        productoId: productId,
        cantidad: newQuantity,
      });
      if (Array.isArray(response.data.carrito)) {
        setCartItems(response.data.carrito);
      } else {
        throw new Error("Los datos del carrito no son un arreglo");
      }
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto:", error);
      setError(
        "No se pudo actualizar la cantidad del producto. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete("/api/cart/limpiar-carrito");
      setCartItems([]);
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
      setError("No se pudo limpiar el carrito. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.cantidad || 0),
    0
  );

  const cartTotalPrice = cartItems.reduce((total, item) => {
    return total + (item.producto?.precio || 0) * (item.cantidad || 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        cartTotal,
        cartTotalPrice,
        isLoading,
        error,
        fetchCart: loadCartItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
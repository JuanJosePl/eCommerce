import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '@/helper/auth';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/cart/obtener-carrito');
      if (Array.isArray(response.data)) {
        setCartItems(response.data);
      } else {
        console.error('Datos del carrito no son un arreglo:', response.data);
      }
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
    setIsLoading(false);
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await api.post('/api/cart/agregar-carrito', { productoId: productId, cantidad: quantity });
      if (Array.isArray(response.data.carrito)) {
        setCartItems(response.data.carrito);
      } else {
        console.error('Datos del carrito no son un arreglo:', response.data.carrito);
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await api.delete(`/api/cart/eliminar-carrito/${productId}`);
      if (Array.isArray(response.data.carrito)) {
        setCartItems(response.data.carrito);
      } else {
        console.error('Datos del carrito no son un arreglo:', response.data.carrito);
      }
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.cantidad, 0) : 0;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal, isLoading, fetchCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
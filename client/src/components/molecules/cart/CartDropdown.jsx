import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/helper/number';

const CartDropdown = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateCartItemQuantity, isLoading } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

  const dropdownVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 300 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed right-0 top-16 w-full max-w-sm h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 shadow-xl z-50 border-l border-input flex flex-col"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 border-b border-input">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Carrito de Compras</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <p>Cargando carrito...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.map((item) => (
                  <div key={item.producto._id} className="flex items-center justify-between py-2 border-b border-input">
                    <div className="flex items-center">
                      <img src={item.producto.imagen} alt={item.producto.nombre} className="w-16 h-16 object-cover mr-4 rounded" />
                      <div>
                        <p className="font-medium">{item.producto.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.producto.precio)}
                        </p>
                        <div className="flex items-center mt-1">
                          <Button variant="outline" size="sm" onClick={() => updateCartItemQuantity(item.producto._id, item.cantidad - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2">{item.cantidad}</span>
                          <Button variant="outline" size="sm" onClick={() => updateCartItemQuantity(item.producto._id, item.cantidad + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.producto._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-input bg-white dark:bg-gray-800"> {/* Cambiado a bg-white para modo claro */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">{formatPrice(total)}</span>
                </div>
                <Button className="w-full">Proceder al Pago</Button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;
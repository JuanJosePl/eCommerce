import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/constants/env";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/wishlist`, { withCredentials: true });
        setWishlistItems(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la lista de deseos.",
          variant: "destructive",
        });
      }
    };

    fetchWishlist();
  }, [toast]);

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/api/wishlist/${itemId}`, { withCredentials: true });
      setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
      toast({
        title: "Elemento eliminado",
        description: "El elemento ha sido eliminado de tu lista de deseos.",
      });
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el elemento de la lista de deseos.",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      await axios.post(`${API_URL}/api/cart`, { productId: itemId }, { withCredentials: true });
      toast({
        title: "Añadido al carrito",
        description: "El elemento ha sido añadido a tu carrito.",
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast({
        title: "Error",
        description: "No se pudo añadir el elemento al carrito.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mi Lista de Deseos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="w-full h-48 object-cover mb-4"
              />
              <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="icon" onClick={() => handleRemoveFromWishlist(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleAddToCart(item.id)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al Carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
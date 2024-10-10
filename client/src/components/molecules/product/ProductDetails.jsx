import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  Star,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistProvider";
import { formatPrice } from "@/helper/number";
import axios from "axios";
import { API_URL } from "@/constants/env";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/productos/producto/${id}`
        );
        setProduct(response.data);
        setSelectedImage(0);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar el producto.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  const isInWishlist = wishlist.some((item) => item._id === id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Añadido al carrito",
      description: `${product.nombre} se ha añadido al carrito.`,
    });
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(id);
      toast({
        title: "Eliminado de la lista de deseos",
        description: `${product.nombre} se ha eliminado de tu lista de deseos.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Añadido a la lista de deseos",
        description: `${product.nombre} se ha añadido a tu lista de deseos.`,
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full" />
          <div>
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">Producto no encontrado.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={
              product.imagenes.length > 0
                ? product.imagenes[selectedImage]
                : product.imagen
            }
            alt={product.nombre}
            className="w-full h-auto object-cover rounded-lg shadow-lg mb-4"
          />
          {product.imagenes.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {product.imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt={`${product.nombre} - imagen ${index + 1}`}
                  className={`w-full h-20 object-cover rounded cursor-pointer ${
                    selectedImage === index ? "border-2 border-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.nombre}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating || 0)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.numResenas || 0} reseñas)
            </span>
          </div>
          <p className="text-2xl font-semibold mb-4">
            {formatPrice(product.precio)}
          </p>
          {product.enOferta && product.precioOferta && (
            <p className="text-lg text-gray-500 line-through mb-2">
              {formatPrice(product.precio)}
            </p>
          )}
          <p className="mb-4">{product.descripcion}</p>
          <div className="mb-4">
            <Badge variant={product.stock > 0 ? "success" : "destructive"}>
              {product.stock > 0 ? `En stock (${product.stock})` : "Agotado"}
            </Badge>
          </div>
          <div className="flex items-center mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="mx-4">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            >
              +
            </Button>
          </div>
          <div className="flex space-x-4 mb-6">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1"
            >
              Comprar ahora
            </Button>
            <Button
              variant={isInWishlist ? "destructive" : "secondary"}
              onClick={handleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          <Tabs defaultValue="descripcion" className="w-full">
            <TabsList>
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="especificaciones">
                Especificaciones
              </TabsTrigger>
              <TabsTrigger value="envio">Envío y devoluciones</TabsTrigger>
            </TabsList>
            <TabsContent value="descripcion">
              <p>{product.descripcion}</p>
            </TabsContent>
            <TabsContent value="especificaciones">
              <ul className="list-disc pl-5">
                {product.dimensiones && (
                  <li>
                    Dimensiones: {product.dimensiones.largo}x
                    {product.dimensiones.ancho}x{product.dimensiones.alto} cm
                  </li>
                )}
                {product.peso && <li>Peso: {product.peso} kg</li>}
                {product.marca && <li>Marca: {product.marca}</li>}
                {product.etiquetas && product.etiquetas.length > 0 && (
                  <li>Etiquetas: {product.etiquetas.join(", ")}</li>
                )}
              </ul>
            </TabsContent>
            <TabsContent value="envio">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Truck className="mr-2 h-4 w-4" />
                  <span>Envío gratuito en pedidos superiores a $50</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  <span>Devoluciones gratuitas dentro de los 30 días</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {product.resenas && product.resenas.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Reseñas de clientes</h2>
          {product.resenas.map((resena, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < resena.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{resena.usuario.nombre}</span>
              </div>
              <p>{resena.comentario}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

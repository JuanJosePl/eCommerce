'use client'

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  Star,
  Truck,
  RotateCcw,
  ZoomIn,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [question, setQuestion] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/productos/producto/${id}`);
        setProduct(response.data);
        setSelectedImage(0);
        
        // Fetch related products
        const relatedResponse = await axios.get(`${API_URL}/api/productos/categoria/${response.data.categoria}`);
        setRelatedProducts(relatedResponse.data.filter(p => p._id !== id).slice(0, 4));
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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/productos/resena/${id}`, {
        rating: reviewRating,
        comentario: reviewComment,
      });
      toast({
        title: "Reseña enviada",
        description: "Gracias por compartir tu opinión.",
      });
      setReviewRating(0);
      setReviewComment("");
      // Refresh product data to show new review
      const response = await axios.get(`${API_URL}/api/productos/producto/${id}`);
      setProduct(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la reseña.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/productos/pregunta/${id}`, { pregunta: question });
      toast({
        title: "Pregunta enviada",
        description: "Tu pregunta ha sido enviada y será respondida pronto.",
      });
      setQuestion("");
      // Refresh product data to show new question
      const response = await axios.get(`${API_URL}/api/productos/producto/${id}`);
      setProduct(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar la pregunta.",
        variant: "destructive",
      });
    }
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
    return <div className="container mx-auto px-4 py-8">Producto no encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Dialog>
            <DialogTrigger>
              <img
                src={product.imagenes[selectedImage] || product.imagen}
                alt={product.nombre}
                className="w-full h-auto object-cover rounded-lg shadow-lg mb-4 cursor-zoom-in"
              />
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <img
                src={product.imagenes[selectedImage] || product.imagen}
                alt={product.nombre}
                className="w-full h-auto object-contain"
              />
            </DialogContent>
          </Dialog>
          <Carousel>
            <CarouselContent>
              {product.imagenes.map((imagen, index) => (
                <CarouselItem key={index} className="basis-1/5">
                  <img
                    src={imagen}
                    alt={`${product.nombre} - imagen ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer ${
                      selectedImage === index ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
          <p className="text-2xl font-semibold mb-2">{formatPrice(product.precio)}</p>
          {product.enOferta && product.precioOferta && (
            <>
              <p className="text-lg text-gray-500 line-through mb-2">
                {formatPrice(product.precio)}
              </p>
              <Badge variant="destructive" className="mb-2">
                {product.descuento}% de descuento
              </Badge>
            </>
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
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            >
              <Plus className="h-4 w-4" />
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
              <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
            </Button>
          </div>

          <Tabs defaultValue="descripcion" className="w-full">
            <TabsList>
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
              <TabsTrigger value="envio">Envío y devoluciones</TabsTrigger>
            </TabsList>
            <TabsContent value="descripcion">
              <p>{product.descripcion}</p>
            </TabsContent>
            <TabsContent value="especificaciones">
              <ul className="list-disc pl-5">
                {product.marca && <li>Marca: {product.marca}</li>}
                {product.peso && <li>Peso: {product.peso} kg</li>}
                {product.dimensiones && (
                  <li>
                    Dimensiones: {product.dimensiones.largo}x
                    {product.dimensiones.ancho}x{product.dimensiones.alto} cm
                  </li>
                )}
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

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Compartir</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reseñas de clientes</h2>
        {product.resenas && product.resenas.length > 0 ? (
          <>
            {(showAllReviews ? product.resenas : product.resenas.slice(0, 3)).map((resena, index) => (
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
            {product.resenas.length > 3 && (
              <Button onClick={() => setShowAllReviews(!showAllReviews)}>
                {showAllReviews ? "Ver menos reseñas" : "Ver todas las reseñas"}
              </Button>
            )}
          </>
        ) : (
          <p>No hay reseñas aún. ¡Sé el primero en opinar!</p>
        )}

        <form onSubmit={handleSubmitReview} className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Deja tu reseña</h3>
          <div className="flex mb-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-6 w-6 cursor-pointer ${
                  index < reviewRating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
                onClick={() => setReviewRating(index + 1)}
              />
            ))}
          </div>
          <Textarea
            className="w-full p-2 border rounded-md mb-2"
            rows="3"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            placeholder="Escribe tu opinión aquí..."
            required
          />
          <Button type="submit">Enviar reseña</Button>
        </form>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Preguntas y respuestas</h2>
        <Accordion type="single" collapsible className="mb-4">
          {product.preguntas && product.preguntas.map((pregunta, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{pregunta.pregunta}</AccordionTrigger>
              <AccordionContent>
                {pregunta.respuesta || "Esta pregunta aún no ha sido respondida."}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <form onSubmit={handleSubmitQuestion}>
          <h3 className="text-lg font-semibold mb-2">Haz una pregunta</h3>
          <Textarea
            className="w-full p-2 border rounded-md mb-2"
            rows="2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            required
          />
          <Button type="submit">Enviar pregunta</Button>
        </form>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Productos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct._id} className="cursor-pointer" onClick={() => navigate(`/productos/${relatedProduct._id}`)}>
                <CardHeader>
                  <img
                    src={relatedProduct.imagen}
                    alt={relatedProduct.nombre}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{relatedProduct.nombre}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{formatPrice(relatedProduct.precio)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
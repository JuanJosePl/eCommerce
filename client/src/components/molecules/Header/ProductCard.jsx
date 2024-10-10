import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/helper/number";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }) => {
  const { imagen, nombre, _id, precio, descripcion } = product;
  const { addToCart } = useCart();

  // Verifica si la ruta de la imagen es válida
  const imageUrl = imagen.startsWith('http') ? imagen : `http://localhost:8000${imagen}`;

  const handleAddToCart = () => {
    addToCart(_id, 1);
  };

  return (
    <Card className="overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <div className="relative">
        <Link to={`/productos/${_id}`}>
          <img
            src={imageUrl}
            alt={nombre}
            className="w-full h-64 object-cover"
            onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible'}
          />
        </Link>
        <Badge className="absolute top-2 left-2" variant="destructive">
          {product.nuevo ? 'Nuevo' : ''}
        </Badge>
        {product.promocion && (
          <Badge className="absolute top-2 right-2" variant="secondary">
            20% OFF
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle>{nombre}</CardTitle>
        <p className="text-gray-600">{descripcion}</p>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatPrice(precio)}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
        </Button>
        <Link to={`/productos/${_id}`}>
          <Button size="sm">Ver Detalles</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
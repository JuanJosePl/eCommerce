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

const ProductCard = ({ product }) => {
  const { images, product_name, id, price, description } = product;

  return (
    <Card className="overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <div className="relative">
        <Link to={`/productos/${id}`}>
          <img
            src={images[0]}
            alt={product_name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <Badge className="absolute top-2 left-2" variant="destructive">
          Nuevo
        </Badge>
        <Badge className="absolute top-2 right-2" variant="secondary">
          20% OFF
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>{product_name}</CardTitle>
        <p className="text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatPrice(price)}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
        </Button>
        <Link to={`/productos/${id}`}>
          <Button size="sm">Ver Detalles</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({
  name,
  description,
  price,
  image,
  category,
  rating,
  sales,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{category}</CardDescription>
    </CardHeader>
    <CardContent>
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <p>{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-2xl font-bold">${price.toFixed(2)}</span>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
          <span className="ml-1">{rating}</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-600">{sales} vendidos</div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button asChild>
        <Link to={`/productos/${name.toLowerCase().replace(/ /g, "-")}`}>
          Ver Detalles
        </Link>
      </Button>
      <Button variant="outline">
        <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al Carrito
      </Button>
    </CardFooter>
  </Card>
);

export default function BestSellersPage() {
  const bestSellers = [
    {
      name: "Auriculares Inalámbricos Pro",
      description: "Auriculares con cancelación de ruido y alta fidelidad",
      price: 199.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Electrónica",
      rating: 4.8,
      sales: 15000,
    },
    {
      name: "Camiseta Deportiva UltraFit",
      description: "Camiseta transpirable para entrenamiento intenso",
      price: 39.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Ropa",
      rating: 4.7,
      sales: 12000,
    },
    {
      name: "Cafetera Automática Deluxe",
      description: "Cafetera programable con molinillo integrado",
      price: 129.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Hogar",
      rating: 4.9,
      sales: 10000,
    },
    {
      name: "Mochila Viajera Resistente",
      description: "Mochila espaciosa y duradera para aventureros",
      price: 79.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Accesorios",
      rating: 4.6,
      sales: 8000,
    },
    {
      name: "Set de Cuidado Facial Premium",
      description: "Kit completo para una rutina de cuidado facial",
      price: 89.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Belleza",
      rating: 4.7,
      sales: 7500,
    },
    {
      name: "Smartwatch Fitness Tracker",
      description: "Reloj inteligente con múltiples funciones de salud",
      price: 149.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Electrónica",
      rating: 4.8,
      sales: 7000,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Productos Más Vendidos</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestSellers.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

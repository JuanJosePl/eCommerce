import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

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

const ProductCard = ({ name, description, price, image, category }) => (
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
        <Badge>Nuevo</Badge>
      </div>
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

export default function NewArrivalsPage() {
  const newProducts = [
    {
      name: "Smartphone XYZ",
      description: "El último modelo con cámara de alta resolución",
      price: 699.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Electrónica",
    },
    {
      name: "Zapatillas Runner Pro",
      description: "Zapatillas de running con la última tecnología",
      price: 129.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Deportes",
    },
    {
      name: "Set de Cocina Premium",
      description: "Juego de ollas y sartenes de acero inoxidable",
      price: 249.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Hogar",
    },
    {
      name: "Vestido de Noche Elegante",
      description: "Vestido largo para ocasiones especiales",
      price: 159.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Ropa",
    },
    {
      name: "Libro: 'El Futuro de la IA'",
      description: "Exploración de la inteligencia artificial y su impacto",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Libros",
    },
    {
      name: "Drone Explorer X",
      description: "Drone con cámara 4K y 30 minutos de vuelo",
      price: 399.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Electrónica",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Nuevas Llegadas</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

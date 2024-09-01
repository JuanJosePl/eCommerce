import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CategoryCard = ({ name, description, image, productCount }) => (
  <Card>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
    </CardContent>
    <CardFooter className="flex justify-between">
      <div>{productCount} productos</div>
      <Button asChild>
        <Link to={`/categorias/${name.toLowerCase()}`}>Ver Productos</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function CategoriesPage() {
  const categories = [
    {
      name: "Electrónica",
      description: "Gadgets y dispositivos electrónicos",
      image: "/placeholder.svg?height=200&width=300",
      productCount: 150,
    },
    {
      name: "Ropa",
      description: "Moda para hombres y mujeres",
      image: "/placeholder.svg?height=200&width=300",
      productCount: 300,
    },
    {
      name: "Hogar",
      description: "Decoración y artículos para el hogar",
      image: "/placeholder.svg?height=200&width=300",
      productCount: 200,
    },
    {
      name: "Deportes",
      description: "Equipamiento y ropa deportiva",
      image: "/placeholder.svg?height=200&width=300",
      productCount: 100,
    },
    {
      name: "Libros",
      description: "Libros de todos los géneros",
      image: "/placeholder.svg?height=200&width=300",
      productCount: 250,
    },
    {
      name: "Juguetes",
      description: "Juguetes para todas las edades",
      image: "/placeholder.svg?height=200&width=300",
      productCount: 120,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Categorías de Productos</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  );
}

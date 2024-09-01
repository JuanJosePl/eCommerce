import React from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    id: 1,
    name: "Smartphone Pro X",
    image: "/placeholder.svg?height=100&width=100",
    price: 999.99,
    specs: {
      screen: "6.5 inch OLED",
      camera: "Triple 12MP",
      battery: "4000mAh",
      storage: "128GB",
      waterResistant: true,
    },
  },
  {
    id: 2,
    name: "Smartphone Ultra Y",
    image: "/placeholder.svg?height=100&width=100",
    price: 1199.99,
    specs: {
      screen: "6.7 inch AMOLED",
      camera: "Quad 108MP",
      battery: "5000mAh",
      storage: "256GB",
      waterResistant: true,
    },
  },
  {
    id: 3,
    name: "Smartphone Lite Z",
    image: "/placeholder.svg?height=100&width=100",
    price: 599.99,
    specs: {
      screen: "6.1 inch LCD",
      camera: "Dual 8MP",
      battery: "3500mAh",
      storage: "64GB",
      waterResistant: false,
    },
  },
];

export default function ProductComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Comparación de Productos</h1>

      <Table>
        <TableCaption>
          Comparación de características de smartphones
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Característica</TableHead>
            {products.map((product) => (
              <TableHead key={product.id}>{product.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Imagen</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover"
                />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Precio</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                ${product.price.toFixed(2)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Pantalla</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>{product.specs.screen}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Cámara</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>{product.specs.camera}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Batería</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>{product.specs.battery}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Almacenamiento</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>{product.specs.storage}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Resistente al agua</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                {product.specs.waterResistant ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-8 flex justify-center space-x-4">
        {products.map((product) => (
          <Button key={product.id}>Añadir {product.name} al carrito</Button>
        ))}
      </div>
    </div>
  );
}

import React from "react"
import { Heart, Trash2, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const wishlistItems = [
  {
    id: 1,
    name: "Cámara DSLR Profesional",
    image: "/placeholder.svg?height=200&width=200",
    price: 1299.99,
    description: "Cámara digital de alta resolución para fotógrafos profesionales",
  },
  {
    id: 2,
    name: "Smartwatch Fitness Pro",
    image: "/placeholder.svg?height=200&width=200",
    price: 299.99,
    description: "Reloj inteligente con múltiples funciones de seguimiento de salud y fitness",
  },
  {
    id: 3,
    name: "Auriculares Inalámbricos Premium",
    image: "/placeholder.svg?height=200&width=200",
    price: 249.99,
    description: "Auriculares con cancelación de ruido y calidad de sonido excepcional",
  },
]

const WishlistItem = ({ item }) => (
  <Card>
    <CardHeader>
      <CardTitle>{item.name}</CardTitle>
      <CardDescription>${item.price.toFixed(2)}</CardDescription>
    </CardHeader>
    <CardContent>
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4" />
      <p>{item.description}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button>
        <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al Carrito
      </Button>
    </CardFooter>
  </Card>
)

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <Heart className="mr-2 h-8 w-8 text-red-500" /> Mi Lista de Deseos
      </h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-4">Tu lista de deseos está vacía</p>
          <Button asChild>
            <a href="/productos">Explorar Productos</a>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      )}
      
      <div className="mt-12 text-center">
        <p className="text-lg mb-4">¿Listo para comprar tus artículos favoritos?</p>
        <Button size="lg">
          <ShoppingCart className="mr-2 h-5 w-5" /> Añadir Todo al Carrito
        </Button>
      </div>
    </div>
  )
}
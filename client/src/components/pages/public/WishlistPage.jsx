import React from "react"
import { Heart, Trash2, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useWishlist } from "@/context/WishlistProvider"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/hooks/use-toast"

const WishlistItem = ({ item, onRemove, onAddToCart }) => (
  <Card>
    <CardHeader>
      <CardTitle>{item.nombre}</CardTitle>
      <CardDescription>${item.precio.toFixed(2)}</CardDescription>
    </CardHeader>
    <CardContent>
      <img src={item.imagen} alt={item.nombre} className="w-full h-48 object-cover mb-4" />
      <p>{item.descripcion}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="icon" onClick={() => onRemove(item._id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button onClick={() => onAddToCart(item)}>
        <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al Carrito
      </Button>
    </CardFooter>
  </Card>
)

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado de tu lista de deseos.",
    })
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    toast({
      title: "Producto añadido",
      description: "El producto ha sido añadido a tu carrito.",
    })
  }

  const handleAddAllToCart = () => {
    wishlist.forEach(item => addToCart(item, 1))
    toast({
      title: "Productos añadidos",
      description: "Todos los productos de tu lista de deseos han sido añadidos al carrito.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <Heart className="mr-2 h-8 w-8 text-red-500" /> Mi Lista de Deseos
      </h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-2xl mb-4">Tu lista de deseos está vacía</p>
          <Button asChild onClick={() => navigate("/productos")}>
            <a>Explorar Productos</a>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <WishlistItem 
              key={item._id} 
              item={item} 
              onRemove={handleRemoveFromWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
      
      {wishlist.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-lg mb-4">¿Listo para comprar tus artículos favoritos?</p>
          <Button size="lg" onClick={handleAddAllToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Añadir Todo al Carrito
          </Button>
        </div>
      )}
    </div>
  )
}
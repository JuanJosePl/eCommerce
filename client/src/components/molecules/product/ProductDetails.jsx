import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/helper/number";

// Obtener los datos del producto en el servidor antes de renderizar
export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const res = await fetch(`https://api.example.com/products/${id}`);
  const product = await res.json();

  return {
    props: { product },
  };
};

// Componente que muestra los detalles del producto
const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.nombre}</h1>
          <p className="text-xl font-semibold mb-4">
            {formatPrice(product.precio)}
          </p>
          <p className="mb-6">{product.descripcion}</p>
          <div className="flex space-x-4">
            <Button onClick={handleAddToCart}>Añadir al carrito</Button>
            <Button variant="outline" onClick={handleWishlist}>
              {isInWishlist
                ? "Quitar de la lista de deseos"
                : "Añadir a la lista de deseos"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

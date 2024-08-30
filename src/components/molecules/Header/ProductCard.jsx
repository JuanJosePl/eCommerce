import { Link } from "react-router-dom";
import { formatPrice } from "../../../helper/number";

const ProductCard = ({ product }) => {
  const { images, product_name, id, price, description } = product;

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-2">
      <article>
        <div className="relative">
          <Link to={`/productos/${id}`}>
            <img
              src={images[0]}
              alt={product_name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
          </Link>
          {/* Etiquetas de nuevo o en oferta */}
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Nuevo
          </span>
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            20% OFF
          </span>
        </div>
        <div className="p-4">
          <Link to={`/productos/${id}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:underline">
              {product_name}
            </h3>
          </Link>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </span>
            <Link
              to={`/productos/${id}`}
              className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProductCard;

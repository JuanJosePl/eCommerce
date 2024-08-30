import React from "react";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../molecules/Header/ProductCard";
import Loader from "../atoms/Loader";

const Products = () => {
  const { data, error, loading } = useFetch("public/products");

  if (loading) return <Loader />
  if (error)
    return <h1 className="text-center text-2xl text-red-500">Error en la petición de producto: {error.message}</h1>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Explora nuestros productos</h1>
      {data.length === 0 ? (
        <p className="text-center text-xl">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "../molecules/Header/ProductCard";
import Loader from "../atoms/Loader";
import useFetch from "@/hooks/useFetch";

const ProductListingPage = () => {
  const { data: products, error, loading } = useFetch("public/products");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0; // 'featured' or default
    });
  }, [filteredProducts, sortBy]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500 text-center">
          Error en la petición de producto: {error.message}
        </h1>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Explora nuestros productos
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3">
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filtrar
          </Button>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <p className="text-center text-xl">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {sortedProducts.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button>
            Cargar más <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;

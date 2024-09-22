import React from "react";
import { useFilters } from "../context/FilterContext";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ProductFilters = () => {
  const { filters, setFilters, sortBy, setSortBy } = useFilters();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Categoría
        </label>
        <Select
          id="category"
          value={filters.category || ""}
          onChange={(e) => setFilters({ category: e.target.value || null })}
        >
          <option value="">Todas las categorías</option>
          <option value="electronics">Electrónica</option>
          <option value="clothing">Ropa</option>
          <option value="books">Libros</option>
        </Select>
      </div>
      <div>
        <label
          htmlFor="minPrice"
          className="block text-sm font-medium text-gray-700"
        >
          Precio mínimo
        </label>
        <Input
          type="number"
          id="minPrice"
          value={filters.minPrice || ""}
          onChange={(e) =>
            setFilters({
              minPrice: e.target.value ? Number(e.target.value) : null,
            })
          }
        />
      </div>
      <div>
        <label
          htmlFor="maxPrice"
          className="block text-sm font-medium text-gray-700"
        >
          Precio máximo
        </label>
        <Input
          type="number"
          id="maxPrice"
          value={filters.maxPrice || ""}
          onChange={(e) =>
            setFilters({
              maxPrice: e.target.value ? Number(e.target.value) : null,
            })
          }
        />
      </div>
      <div>
        <label
          htmlFor="sortBy"
          className="block text-sm font-medium text-gray-700"
        >
          Ordenar por
        </label>
        <Select
          id="sortBy"
          value={sortBy || ""}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sin ordenar</option>
          <option value="price_asc">Precio: Menor a Mayor</option>
          <option value="price_desc">Precio: Mayor a Menor</option>
          <option value="name_asc">Nombre: A-Z</option>
          <option value="name_desc">Nombre: Z-A</option>
        </Select>
      </div>
      <Button
        onClick={() =>
          setFilters({ category: null, minPrice: null, maxPrice: null })
        }
      >
        Limpiar filtros
      </Button>
    </div>
  );
};

export default ProductFilters;

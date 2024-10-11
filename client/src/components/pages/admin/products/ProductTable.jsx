import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  const productsArray = products?.productos || [];

  if (!Array.isArray(productsArray)) {
    console.log("Productos no válidos:", products);
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <Table>
      <TableCaption>Lista de productos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productsArray.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7}>No hay productos disponibles.</TableCell>
          </TableRow>
        ) : (
          productsArray.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-10 h-10 object-cover rounded"
                />
              </TableCell>
              <TableCell>{product.nombre}</TableCell>
              <TableCell>${product.precio.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.categoria}</TableCell>
              <TableCell>{product.activo ? "Activo" : "Inactivo"}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(product)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(product._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
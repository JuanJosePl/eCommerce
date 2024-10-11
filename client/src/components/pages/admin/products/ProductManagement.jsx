import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import { ProductContext } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "./ProductTable";
import ProductDialog from "./ProductDialog";
import ConfirmDialog from "@/components/atoms/confirm-dialog";
import ErrorBoundary from "@/components/atoms/ErrorBoundary";

const ProductManagement = () => {
  const {
    products,
    productsLoading,
    productsError,
    categories,
    categoriesLoading,
    categoriesError,
    currentProduct,
    setCurrentProduct,
    saveProduct,
    deleteProduct,
  } = useContext(ProductContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    descripcion: "",
    activo: true,
    imagenes: null,
  });

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        nombre: currentProduct.nombre,
        precio: currentProduct.precio,
        stock: currentProduct.stock,
        categoria: currentProduct.categoria,
        descripcion: currentProduct.descripcion,
        activo: currentProduct.activo,
        imagenes: currentProduct.imagenes,
      });
    } else {
      setFormData({
        nombre: "",
        precio: "",
        stock: "",
        categoria: "",
        descripcion: "",
        activo: true,
        imagenes: null,
      });
    }
  }, [currentProduct]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSwitchChange = useCallback((checked) => {
    setFormData((prev) => ({ ...prev, activo: checked }));
  }, []);

  const handleImageUpload = useCallback((e) => {
    const files = e.target.files;
    setFormData((prev) => ({ ...prev, imagenes: files }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEditing = Boolean(currentProduct);
    saveProduct(formData, isEditing);
    setIsDialogOpen(false);
    setCurrentProduct(null);
  };

  const handleEdit = useCallback((product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  }, [setCurrentProduct]);

  const handleDelete = useCallback((productId) => {
    setProductToDelete(productId);
    setIsConfirmDialogOpen(true);
  }, []);

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
    }
    setIsConfirmDialogOpen(false);
    setProductToDelete(null);
  };

  const memoizedProductTable = useMemo(
    () => (
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
    [products, handleEdit, handleDelete]
  );

  if (productsLoading || categoriesLoading) {
    return <p>Cargando...</p>;
  }

  if (productsError || categoriesError) {
    return <p>Error: {productsError || categoriesError}</p>;
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Añadir Producto</span>
        </Button>
      </div>
      {memoizedProductTable}
      <ProductDialog
        
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        currentProduct={currentProduct}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSwitchChange={handleSwitchChange}
        handleImageUpload={handleImageUpload}
        handleSubmit={handleSubmit}
        categories={categories}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar eliminación"
        message="¿Estás seguro de que deseas eliminar este producto?"
      />
    </div>
  );
};

const ProductManagementWithErrorBoundary = () => (
  <ErrorBoundary>
    <ProductManagement />
  </ErrorBoundary>
);

export default ProductManagementWithErrorBoundary;
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { API_URL } from "../../../../constants/env";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useFetch from "@/hooks/useFetch";
import ProductTable from "./ProductTable";
import ProductDialog from "./ProductDialog";
import ConfirmDialog from "@/components/atoms/confirm-dialog";
import ErrorBoundary from "@/components/atoms/ErrorBoundary";

axios.defaults.withCredentials = true;

const ProductManagement = () => {
  const { toast } = useToast();
  const {
    data: products,
    error: productsError,
    loading: productsLoading,
    refetch: refetchProducts,
  } = useFetch("api/productos/productos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    isActive: true,
    image: null,
  });

  useEffect(() => {
    if (currentProduct) {
      setFormData(currentProduct);
    } else {
      setFormData({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        isActive: true,
        image: null,
      });
    }
  }, [currentProduct]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSwitchChange = useCallback((checked) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentProduct
        ? `${API_URL}/api/productos/actualizar/producto/${currentProduct._id}`
        : `${API_URL}/api/productos/producto`;
      const method = currentProduct ? "put" : "post";

      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.name);
      formDataToSend.append("descripcion", formData.description);
      formDataToSend.append("precio", formData.price);
      formDataToSend.append("categoria", formData.category);
      formDataToSend.append("stock", formData.stock);

      if (formData.image instanceof File) {
        formDataToSend.append("imagen", formData.image);
      } else if (
        typeof formData.image === "string" &&
        formData.image.startsWith("data:image")
      ) {
        const response = await fetch(formData.image);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        formDataToSend.append("imagen", file);
      } else if (currentProduct && currentProduct.imagen) {
        formDataToSend.append("imagen", currentProduct.imagen);
      } else {
        throw new Error("Se requiere una imagen para el producto.");
      }

      const response = await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Respuesta del servidor:", response.data);

      toast({
        title: currentProduct ? "Producto actualizado" : "Producto creado",
        description: "El producto ha sido guardado exitosamente.",
      });

      refetchProducts();
      setIsDialogOpen(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error(
        "Error al guardar el producto:",
        error.response ? error.response.data : error.message
      );
      toast({
        title: "Error",
        description:
          error.response?.data?.mensaje ||
          "Ocurrió un error al guardar el producto.",
        status: "error",
      });
    }
  };

  const handleEdit = useCallback((product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback((productId) => {
    setProductToDelete(productId);
    setIsConfirmDialogOpen(true);
  }, []);

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await axios.delete(
          `${API_URL}/api/productos/eliminar/producto/${productToDelete}`
        );
        toast({
          title: "Producto eliminado",
          description: "El producto ha sido eliminado exitosamente.",
        });
        refetchProducts();
      } catch (error) {
        toast({
          title: "Error",
          description: "Ocurrió un error al eliminar el producto.",
          status: "error",
        });
      }
    }
    setIsConfirmDialogOpen(false);
    setProductToDelete(null);
  };

  const fetchCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      const response = await axios.get(`${API_URL}/api/productos/categorias`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoriesError("No se pudieron cargar las categorías.");
      toast({
        title: "Error",
        description: "No se pudieron cargar las categorías.",
        status: "error",
      });
    } finally {
      setCategoriesLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
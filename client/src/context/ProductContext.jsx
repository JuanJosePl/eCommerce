import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL } from "@/constants/env";
import { useToast } from "@/hooks/use-toast";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Asegúrate de definir esto

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      const response = await axios.get(`${API_URL}/api/productos/productos`);
      setProducts(response.data);
    } catch (error) {
      setProductsError(error.message);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      const response = await axios.get(`${API_URL}/api/productos/categorias`);
      setCategories(response.data);
    } catch (error) {
      setCategoriesError(error.message);
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleImage = async (image) => {
    if (image instanceof File) {
      return image;
    } else if (typeof image === "string" && image.startsWith("data:image")) {
      const response = await fetch(image);
      const blob = await response.blob();
      return new File([blob], "image.jpg", { type: "image/jpeg" });
    } else if (currentProduct && currentProduct.imagen) {
      return currentProduct.imagen;
    } else {
      throw new Error("Se requiere una imagen para el producto.");
    }
  };

  const saveProduct = async (formData, isEditing = false) => {
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

      // Llamamos a la función handleImage para manejar la imagen
      const imageFile = await handleImage(formData.image);
      formDataToSend.append("imagen", imageFile);

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

      refetchProducts(); // Asegúrate de que esta función esté definida
      setIsDialogOpen(false); // Asegúrate de que este estado esté definido
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

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `${API_URL}/api/productos/eliminar/producto/${productId}`
      );
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente.",
      });

      fetchProducts(); // Refresca la lista de productos después de eliminar
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar el producto.",
        status: "error",
      });
    }
  };

  // Función para actualizar productos manualmente
  const refetchProducts = () => {
    fetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{
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
        fetchProducts,
        refetchProducts, 
        setIsDialogOpen, 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

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

  const saveProduct = async (formData, isEditing = false) => {
    try {
      const url = isEditing
        ? `${API_URL}/api/productos/actualizar/producto/${currentProduct._id}`
        : `${API_URL}/api/productos/producto`;
      const method = isEditing ? "put" : "post";
  
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.nombre || '');
      formDataToSend.append("descripcion", formData.descripcion || '');
      formDataToSend.append("precio", formData.precio || '0');
      formDataToSend.append("categoria", formData.categoria || '');
      formDataToSend.append("stock", formData.stock || '0');
      formDataToSend.append("activo", (formData.activo !== undefined ? formData.activo : true).toString());
  
      if (formData.imagenes instanceof FileList) {
        for (let i = 0; i < formData.imagenes.length; i++) {
          formDataToSend.append("imagenes", formData.imagenes[i]);
        }
      } else if (formData.imagenes instanceof File) {
        formDataToSend.append("imagenes", formData.imagenes);
      }
  
      const response = await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
  
      console.log("Respuesta del servidor:", response.data);
  
      toast({
        title: isEditing ? "Producto actualizado" : "Producto creado",
        description: "El producto ha sido guardado exitosamente.",
      });
  
      fetchProducts();
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

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `${API_URL}/api/productos/eliminar/producto/${productId}`,
        { withCredentials: true }
      );
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente.",
      });

      fetchProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar el producto.",
        status: "error",
      });
    }
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
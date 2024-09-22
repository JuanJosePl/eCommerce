import { API_URL } from "@/constants/env";
import axios from 'axios';

// Configura axios para enviar siempre las credenciales
axios.defaults.withCredentials = true;

// Obtener el estado de autenticación del usuario y su rol
export const getAuthStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/status`);
    return {
      isAuthenticated: response.data.isAuthenticated,
      user: response.data.usuario
    };
  } catch (error) {
    console.error("Error fetching auth status:", error);
    return { isAuthenticated: false, user: null };
  }
};

// Refrescar token de acceso
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/refresh-token`);
    return response.data.mensaje === "Token de acceso actualizado exitosamente.";
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/api/auth/logout`);
    return true;
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
};

// Verificar si el usuario es administrador
export const isAdmin = async () => {
  const { user } = await getAuthStatus();
  return user && user.role === 'admin';
};

// Crear una instancia de axios con interceptores para manejar el refresco de tokens
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si la respuesta es un 401 (Unauthorized) y no se ha reintentado aún
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Si el token fue refrescado, reintentamos la solicitud original
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// Hacer solicitudes protegidas con manejo automático de tokens
export const makeProtectedRequest = async (config) => {
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error("Error en solicitud protegida:", error);
    throw error;
  }
};

export default api;

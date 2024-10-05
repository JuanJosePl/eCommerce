import { API_URL } from "@/constants/env";
import axios from 'axios';

axios.defaults.withCredentials = true;

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

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/refresh-token`);
    return response.data.mensaje === "Token de acceso actualizado exitosamente.";
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/api/auth/logout`);
    return true;
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
};

export const isAdmin = async () => {
  const { user } = await getAuthStatus();
  return user && user.role === 'admin';
};

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

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
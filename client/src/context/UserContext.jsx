import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/usuarios');
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (newUser) => {
    try {
      const response = await axios.post('/api/usuario', newUser);
      setUsers([...users, response.data]); // Añade el nuevo usuario a la lista
    } catch (err) {
      setError(err);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`/api/actualizar/usuario/${updatedUser.id}`, updatedUser);
      setUsers(users.map((user) => (user.id === updatedUser.id ? response.data : user))); // Actualiza el usuario
    } catch (err) {
      setError(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/eliminar/usuario/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Elimina el usuario de la lista
    } catch (err) {
      setError(err);
    }
  };

  return (
    <UserContext.Provider value={{ users, loading, error, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

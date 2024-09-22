import React, { createContext, useContext, useState, useCallback } from 'react';

const GlobalUpdateContext = createContext();

export const useGlobalUpdate = () => useContext(GlobalUpdateContext);

export const GlobalUpdateProvider = ({ children }) => {
  const [updateFlag, setUpdateFlag] = useState(false);

  // Función para disparar una actualización
  const triggerUpdate = useCallback(() => {
    setUpdateFlag(prev => !prev);
  }, []);

  return (
    <GlobalUpdateContext.Provider value={{ updateFlag, triggerUpdate }}>
      {children}
    </GlobalUpdateContext.Provider>
  );
};

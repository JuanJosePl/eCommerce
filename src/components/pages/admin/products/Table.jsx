import React from "react";
import useFetch from "../../hooks/useFetch";

const Table = () => {
  const { data, error, loading } = useFetch("public/products");
  if (loading) return <h1>CARGANDO...</h1>;
  if (error) return <h1>Error en la peticion de producto: {error.message}</h1>;
  return (
    <div>
      <h1>Productos</h1>
      {data.lengt === 0 ? (<p>No hay productos disponibles.</p>) :
      data.map(prod => (
        <div key={ prod.id }>
          { JSON.stringify(prod) }
        </div>
      ))}
    </div>
  );
};

export default Table;

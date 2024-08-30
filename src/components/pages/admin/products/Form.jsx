import axios from "axios";
import { API_URL } from "../../../../constants/env";
import { getToken } from "../../../../helper/auth";

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      product_name: e.target.productName.value.trim(),
      price: Number(e.target.price.value),
      images: [e.target.image.value.trim()],
      description: e.target.description.value.trim(),
      features: {
        color: e.target.color.value.trim(),
        sold: Number(e.target.sold.value),
        year: Number(e.target.year.value),
        rating: Number(e.target.rating.value),
        category: e.target.category.value.trim(),
        model: e.target.model.value.trim(),
        brand: e.target.brand.value.trim(),
        home_delivery: e.target.homeDelivery.checked,
        new: e.target.new.checked,
      },
    };

    if (isNaN(data.price) || data.price <= 0) {
      alert("El precio debe ser un número positivo");
      return;
    }
    
    if (isNaN(data.sold) || data.sold < 0) {
      alert("El número de vendidos debe ser un número no negativo");
      return;
    }
    
    if (isNaN(data.year) || data.year <= 0) {
      alert("El año debe ser un número positivo");
      return;
    }
    
    if (isNaN(data.rating) || data.rating < 0 || data.rating > 5) {
      alert("El rating debe estar entre 0 y 5");
      return;
    }

    axios
      .post(`${API_URL}/admin/products`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response);
        alert("Producto creado exitosamente");
        // Limpiar el formulario o redirigir
        e.target.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert("Hubo un problema con el envío de datos al servidor");
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Crear Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="productName"
            placeholder="Nombre"
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="url"
            name="image"
            placeholder="Imagen URL"
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="number"
            name="sold"
            placeholder="Vendidos"
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Año"
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            min="0"
            max="5"
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Categorías"
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Modelo"
            className="p-2 border rounded-lg w-full"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Marca"
            className="p-2 border rounded-lg w-full"
            required
          />
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="homeDelivery" className="form-checkbox" />
            <span>Envío a domicilio</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="new" className="form-checkbox" />
            <span>Nuevo</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default Form;

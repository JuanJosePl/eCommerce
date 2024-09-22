import Devolucion from "../model/devolucionModel.js";



export const solicitarDevolucion = async (req, res) => {
    try {
      const { ordenId, productos } = req.body;
      const devolucion = new Devolucion({
        orden: ordenId,
        usuario: req.user._id,
        productos
      });
      await devolucion.save();
      res.status(201).json({ mensaje: "Solicitud de devolución creada con éxito.", devolucion });
    } catch (error) {
      res.status(500).json({ mensajeError: error.message });
    }
  };
  
  export const actualizarEstadoDevolucion = async (req, res) => {
    try {
      const { id } = req.params;
      const { estado, comentarios } = req.body;
      const devolucion = await Devolucion.findByIdAndUpdate(id, { estado, comentarios }, { new: true });
      res.json({ mensaje: "Estado de devolución actualizado.", devolucion });
    } catch (error) {
      res.status(500).json({ mensajeError: error.message });
    }
  };
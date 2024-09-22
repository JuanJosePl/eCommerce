import Notificacion from "../model/notificacionModel.js";



export const obtenerNotificaciones = async (req, res) => {
    try {
      const notificaciones = await Notificacion.find({ usuario: req.user._id })
                                               .sort('-createdAt')
                                               .limit(20);
      res.json(notificaciones);
    } catch (error) {
      res.status(500).json({ mensajeError: error.message });
    }
  };
  
  export const marcarNotificacionComoLeida = async (req, res) => {
    try {
      const { id } = req.params;
      await Notificacion.findByIdAndUpdate(id, { leida: true });
      res.json({ mensaje: "Notificación marcada como leída." });
    } catch (error) {
      res.status(500).json({ mensajeError: error.message });
    }
  };
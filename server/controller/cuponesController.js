import Cupon from "../model/cuponModel.js";



export const aplicarCupon = async (req, res) => {
    try {
      const { codigo } = req.body;
      const cupon = await Cupon.findOne({ codigo });
  
      if (!cupon) {
        return res.status(404).json({ mensaje: "Cupón no encontrado." });
      }
  
      const ahora = new Date();
      if (ahora < cupon.fechaInicio || ahora > cupon.fechaFin) {
        return res.status(400).json({ mensaje: "El cupón no es válido en este momento." });
      }
  
      if (cupon.usoMaximo && cupon.usosActuales >= cupon.usoMaximo) {
        return res.status(400).json({ mensaje: "El cupón ha alcanzado su límite de uso." });
      }
  
      // Lógica para aplicar el descuento al carrito del usuario
      // ...
  
      cupon.usosActuales += 1;
      await cupon.save();
  
      res.json({ mensaje: "Cupón aplicado con éxito.", descuento: cupon.descuento });
    } catch (error) {
      res.status(500).json({ mensajeError: error.message });
    }
  };
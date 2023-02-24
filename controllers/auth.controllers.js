import { validationResult } from 'express-validator';
import { User } from "../models/User.js";

export const register = async (req, res) => {
  const { email, contraseña } = req.body;

  // Verificar si se proporcionaron todos los campos requeridos
  const { nombre, apellido, edad, repassword } = req.body;
  if (!nombre || !apellido || !email || !contraseña || !edad || !repassword) {
    return res
      .status(400)
      .json({ mensaje: "Por favor, proporcione todos los campos requeridos." });
  }

  try {
    const user = new User({ nombre, apellido, edad, email, contraseña });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    await user.save();

    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  res.json({ ok: "login" });
};

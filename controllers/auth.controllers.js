import { validationResult } from "express-validator";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

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

    //Generar el token JWT

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error.code);

    //usuario existente mediante la validacion de schema unique
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con este email" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    const respuestaPassword = await user.comparePassword(contraseña);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });

    //Generar el token JWT
    const { token, expiresIn } = generateToken(user.id);

    return res.json({ token, expiresIn });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: "error de server"});
  }
};

import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = Router();

router.post(
  "/register",
  [
    body("nombre").notEmpty(),
    body("apellido").notEmpty(),
    body("edad").notEmpty().isInt({ min: 18, max: 100 }),
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("contraseña", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
    body("repassword", "No coinciden las contraseñas").custom(
      (value, { req }) => {
        if (value !== req.body.contraseña) {
          throw new Error("No coinciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);

router.get(
  "/login",
  [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("contraseña", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

export default router;

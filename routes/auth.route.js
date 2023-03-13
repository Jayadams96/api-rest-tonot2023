import { Router } from "express";
import { infoUser, login, register } from "../controllers/auth.controllers.js";
import { body } from "express-validator";
import { check } from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";

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
    body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
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

router.post(
  "/login",
  [
    check("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    check("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

router.get('/protected', requireToken ,infoUser)

export default router;

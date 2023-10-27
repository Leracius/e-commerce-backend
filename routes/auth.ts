import { Router } from "express";
import { login, register, verifyUser } from "../controllers/authController";
import { check } from "express-validator"
import { colectErrors } from "../middlewares/colectErrors";
import { existEmail } from "../helpers/isEmail";

const router = Router();

router.post('/register', [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("surname", "El apellido es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").custom(existEmail),
    check("email", "El email ya existe").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({min: 6}),
    colectErrors
], register)

router.post('/login', [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de 6 caracteres").isLength({min: 6})
], login)

router.patch('/verify', [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email ya existe").isEmail(),
    check("code", "Falta el codigo").not().isEmpty(),
    colectErrors
], verifyUser)


export default router
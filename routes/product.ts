import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";
import { check } from "express-validator"

const router = Router()

router.get('/',[
    check("id", "El id es obligatorio").not().isEmpty(),
    check("category", "El category es obligatorio").not().isEmpty(),
    check("img", "El img es obligatorio").not().isEmpty(),
    check("name", "El name es obligatorio").not().isEmpty(),
    check("price", "El price es obligatorio").not().isEmpty(),
],getProducts)

router.post('/',[

], createProduct)

export default router
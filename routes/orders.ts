import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController";
import validateJWT from "../middlewares/validateJWT";
import { isVerify } from "../middlewares/validateVerify";
import { check } from "express-validator";
import { colectErrors } from "../middlewares/colectErrors";

const router = Router()

router.get("/", [
    validateJWT
], getOrders)

router.post("/", [
    validateJWT,
    isVerify,
    check("price", "price es obligatorio").not().isEmpty(),
    check("shippingCost", "shippingCost es obligatorio").not().isEmpty(),
    check("total", "total es obligatorio").not().isEmpty(),
    check("shippingDetails", "shippingDetails es obligatorio").not().isEmpty(),
    check("items", "items es obligatorio").not().isEmpty(),
    colectErrors
], createOrder)

export default router
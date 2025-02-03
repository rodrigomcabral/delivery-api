import express from "express";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", OrderController.createOrder)
router.get("/", OrderController.getOrders)
router.get("/moreOrders", OrderController.moreOrders)
router.get("/:id", OrderController.getOrder)
router.delete("/:id", OrderController.deleteOrder)
router.put("/", OrderController.updateOrder)
router.patch("/updateDelivery", OrderController.updateDelivery);
router.post("/totalClient", OrderController.totalClient)
router.post("/totalProduct", OrderController.totalProduct)

router.use((error, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${error.message}`)
    res.status(400).send( { error: error.message})
})

export default router;
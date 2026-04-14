import express from "express";
import { displayOrders, editOrder, placeOrder, showEditForm, showOrders } from "../controllers/orderController.js";

const orderRouter = express.Router()

orderRouter.post("/place-order", placeOrder)
orderRouter.get("/show-orders/:email", showOrders)
orderRouter.get("/show-orders", displayOrders)
orderRouter.get("/edit/:id", showEditForm)
orderRouter.post("/edit/:id", editOrder)

export default orderRouter
import express from "express";
import {
    addProduct,
    deleteProduct,
    displayProducts,
    editProduct,
    saveNewProduct,
    saveProduct,
    showProducts
} from "../controllers/productController.js";
const productRouter = express.Router();
productRouter.get("/", displayProducts);
productRouter.get("/show", showProducts);
productRouter.get("/add", addProduct);
productRouter.post("/add", saveNewProduct);
productRouter.get("/:id/delete", deleteProduct);
productRouter.get("/:id/edit", editProduct);
productRouter.post("/:id/edit", saveProduct);
export default productRouter;
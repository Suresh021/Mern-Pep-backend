import express from "express";
import {
    login,
    loginForm,
    logout,
    saveNewUser,
    signup,
} from "../controllers/authController.js";
const authRouter = express.Router();
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/signup", signup);
authRouter.get("/", loginForm);
authRouter.post("/add", saveNewUser);
export default authRouter;
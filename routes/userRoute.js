import express from "express"
import { addUser, deleteUser, login, showUser } from "../controllers/userController.js"
import { authenticate, authorize } from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.get("/", authenticate, authorize("admin"), showUser)
userRouter.post("/login", login)
userRouter.post("/signup", addUser)
userRouter.delete("/:id", authenticate, authorize("admin"), deleteUser)

export default userRouter
import { Router } from "express";
import { login, signUp } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.post("/user", protect, login)

export default authRouter
import { Router } from "express";
import { createExpense, getAllExpenses } from "../controllers/expense.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const expenseRouter = Router()

expenseRouter.post("/", protect, createExpense)
expenseRouter.get("/", protect, getAllExpenses)

export default expenseRouter
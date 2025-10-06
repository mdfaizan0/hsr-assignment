import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import expenseRouter from "./routes/expense.routes.js"
import authRouter from "./routes/auth.routes.js"
import { protect } from "./middlewares/auth.middleware.js"
import { getSummary } from "./controllers/expense.controller.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB Connected")
    })
    .catch((err) => {
        console.log("Error connecting to DB", err)
    })

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Backend is live!")
})

app.use("/expenses", expenseRouter)
app.use("/auth", authRouter)
app.get("/summary", protect, getSummary)
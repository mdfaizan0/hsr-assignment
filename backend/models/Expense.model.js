import mongoose from "mongoose"

const expenseSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["Food", "Travel", "Shopping", "Bills", "Others"],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ""
    }
})

const Expense = mongoose.model("Expense", expenseSchema)

export default Expense
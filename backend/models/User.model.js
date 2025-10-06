import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense",
    }]
})

const User = mongoose.model("User", userSchema)

export default User
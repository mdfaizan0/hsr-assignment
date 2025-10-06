import User from "../models/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function signUp(req, res) {
    const { name, email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Please enter the required fields" })
    }

    try {
        const exist = await User.findOne({ email })
        if (exist) {
            return res.status(409).json({ message: "User already exists, please login instead" })
        }

        const hashed = await bcrypt.hash(password, 12)

        const user = await User.create({ name: name || email, email, password: hashed })

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" })

        return res.status(201).json({ message: "User created successfully", user, token })
    } catch (error) {
        return res.status(500).json({ message: "Server error while registering the user", error: error.message })
    }
}

export async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Please enter the required fields" })
    }

    try {
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(404).json({ message: "Unable to find the user" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(401).json({ message: "Unable to verify the user, please check your password" })

        const userObj = user.toObject()
        delete userObj.password

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        return res.status(200).json({ message: "User authorized", user: userObj, token })
    } catch (error) {
        return res.status(500).json({ message: "Server error while signing in", error: error.message })
    }
}

export async function userDetails(req, res) {
    const user = req.user

    try {
        const currentUser = await User.findOne({ email: user.email })

        return res.status(200).json({ currentUser })
    } catch (error) {
        return res.status(500).json({ message: "Server error while fetching user details", error: error.message })
    }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const Student = require("../models/student.model.js");

// Signup
const signup = async (req, res) => {
    try {
        const { name, email, password, role, course } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        if (role === "student") {
            await Student.create({
                userId: newUser._id,
                name,
                email,
                course: course || "Not specified"
            });
        }

        res.status(201).json({
            message: "Account created successfully",
            role: newUser.role
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Failed to create account. Please try again." });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed. Please try again." });
    }
};

module.exports = {
    signup,
    login
};

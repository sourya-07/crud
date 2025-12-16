const Student = require("../models/student.model.js");
const User = require("../models/user.model.js");


// Admin: get all students

const getAllStudents = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin access only" });
        }

        const students = await Student.find();
        res.status(200).json(students);


    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// Student: get own profile
const getMyProfile = async (req, res) => {
    try {
        const student = await Student.findOne({ userId: req.user._id });

        if (!student) {
            return res.status(404).json({ message: "Student profile not found" });
        }

        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Student: update own profile
const updateProfile = async (req, res) => {
    try {
        const { name, course } = req.body;

        const student = await Student.findOneAndUpdate(
            { userId: req.user._id },
            { name, course },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student profile not found" });
        }

        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Admin: add new student
const addStudent = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin access only" });
        }

        const { userId, name, email, course } = req.body;

        const student = await Student.create({
            userId,
            name,
            email,
            course
        });

        res.status(201).json(student);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Admin: update student
const updateStudent = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin access only" });
        }

        const { id } = req.params;

        const student = await Student.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Admin: delete student
const deleteStudent = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin access only" });
        }

        const { id } = req.params;

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    getAllStudents,
    getMyProfile,
    updateProfile,
    addStudent,
    updateStudent,
    deleteStudent
};

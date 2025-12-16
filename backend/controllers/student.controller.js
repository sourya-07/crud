const Student = require("../models/student.model.js");
const User = require("../models/user.model.js");

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ enrollmentDate: -1 });
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Failed to fetch students" });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const student = await Student.findOne({ userId: req.user._id });

        if (!student) {
            return res.status(404).json({ message: "Student profile not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, course } = req.body;

        const updatedStudent = await Student.findOneAndUpdate(
            { userId: req.user._id },
            { name, course },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student profile not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};

const addStudent = async (req, res) => {
    try {
        const { userId, name, email, course } = req.body;

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "Student with this email already exists" });
        }

        const newStudent = await Student.create({
            userId,
            name,
            email,
            course
        });

        res.status(201).json(newStudent);
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Failed to add student" });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Failed to update student" });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            message: "Student deleted successfully",
            deletedStudent
        });
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Failed to delete student" });
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

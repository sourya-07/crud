const express = require("express");
const authMiddleware = require("../middleware/auth.js");
const roleCheck = require("../middleware/roleCheck.js");

const {
  getAllStudents,
  getMyProfile,
  updateProfile,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/student.controller.js");

const router = express.Router();

// Student routes
router.get("/me", authMiddleware, roleCheck("student"), getMyProfile);
router.put("/me", authMiddleware, roleCheck("student"), updateProfile);

// Admin routes
router.get("/", authMiddleware, roleCheck("admin"), getAllStudents);
router.post("/", authMiddleware, roleCheck("admin"), addStudent);
router.put("/:id", authMiddleware, roleCheck("admin"), updateStudent);
router.delete("/:id", authMiddleware, roleCheck("admin"), deleteStudent);

module.exports = router;
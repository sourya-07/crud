const express = require("express")
const authMiddleware = require("../middleware/auth.js")
const roleCheck = require("../middleware/roleCheck.js")

const {
  getAllStudents,
  getMyProfile,
  updateProfile,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/student.controller.js")

const router = express.Router()
// Admin: get all students
router.get(
  "/",
  authMiddleware,
  roleCheck("admin"),
  getAllStudents
)

// Student: get own profile
router.get(
  "/me",
  authMiddleware,
  roleCheck("student"),
  getMyProfile
)

// Student: update own profile
router.put(
  "/me",
  authMiddleware,
  roleCheck("student"),
  updateProfile
)

// Admin: add new student
router.post(
  "/",
  authMiddleware,
  roleCheck("admin"),
  addStudent
)

// Admin: update any student
router.put(
  "/:id",
  authMiddleware,
  roleCheck("admin"),
  updateStudent
)

// Admin: delete any student
router.delete(
  "/:id",
  authMiddleware,
  roleCheck("admin"),
  deleteStudent
)

module.exports = router;
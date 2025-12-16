const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  // Link to User collection
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  course: {
    type: String,
    required: true
  },

  enrollmentDate: {
    type: Date,
    default: Date.now
  }
});

const student = mongoose.model("Student", studentSchema);
module.exports = student;
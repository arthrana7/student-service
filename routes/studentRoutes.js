const express = require("express");
const router = express.Router();
const { students, getNextId } = require("../data/students");
const { validateStudent } = require("../middleware/logger");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid student ID '${id}'. ID must be a positive integer.`,
    });
  }

  const student = students.find((s) => s.id === parseInt(id, 10));

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

router.post("/", validateStudent, (req, res) => {
  const { name, email, age, course } = req.body;

  const emailExists = students.some(
    (s) => s.email.toLowerCase() === String(email).toLowerCase()
  );
  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: `A student with email '${email}' already exists`,
    });
  }

  const newStudent = { id: getNextId(), name, email, age, course };
  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent,
  });
});

router.put("/:id", validateStudent, (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid student ID '${id}'. ID must be a positive integer.`,
    });
  }

  const student = students.find((s) => s.id === parseInt(id, 10));

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`,
    });
  }

  const { name, email, age, course } = req.body;
  student.name = name;
  student.email = email;
  student.age = age;
  student.course = course;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid student ID '${id}'. ID must be a positive integer.`,
    });
  }

  const index = students.findIndex((s) => s.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`,
    });
  }

  const deleted = students.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deleted[0],
  });
});

module.exports = router;

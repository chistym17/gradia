// routes/assignmentRouter.js
import express from "express";
import multer from "multer";
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  submitAssignment,
} from "../controllers/assignmentController.js";

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Use multer.any() to accept all fields
const upload = multer({ storage }).any();

const router = express.Router();

// Add middleware to log form data
const logFormData = (req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);
  next();
};

router.post("/create", createAssignment);
router.get("/getall", getAssignments);
router.get("/:id", getAssignmentById);
router.post("/:id/submit", submitAssignment);  // Added logging middleware

export default router;

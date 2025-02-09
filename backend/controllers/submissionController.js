import Submission from "../models/submissionSchema.js";
import Assignment from "../models/assignmentSchema.js";

// 📌 Submit an Assignment
export const submitAssignment = async (req, res) => {
  try {
 
    
    const assignmentId = req.params.assignmentId;
    const { studentId, student, content } = req.body;

    console.log("Extracted data:", {
      assignmentId,
      studentId,
      student,
      content
    });

    // Create new submission with the data we know we have
    const newSubmission = new Submission({
      assignmentId,
      studentId,
      student,
      content
    });

    console.log("Created submission object:", newSubmission);

    // Save the submission
    const savedSubmission = await newSubmission.save();
    console.log("Saved submission:", savedSubmission);

    // Update the assignment
    await Assignment.findByIdAndUpdate(assignmentId, {
      $push: { submissions: savedSubmission._id },
    });

    res.status(201).json({ 
      success: true, 
      message: "Submission created successfully",
      submission: savedSubmission 
    });
  } catch (error) {
    console.error("Submission error:", error);
    console.error("Error details:", error.errors); // Log validation errors if any
    res.status(500).json({ 
      success: false, 
      message: error.message,
      details: error.errors
    });
  }
};

// 📌 Get Submissions by Assignment
export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    if (!assignmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Assignment ID is required" });
    }

    const submissions = await Submission.find({ assignmentId }).populate(
      "studentId",
      "name email"
    );

    res.status(200).json({ success: true, submissions });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
      error,
    });
  }
};
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json({ success: true, submissions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching submissions", error });
  }
};

// 📌 Grade a Specific Submission
export const gradeSubmission = async (req, res) => {
  try {
    const { id } = req.params; // Submission ID from URL
    const { grade } = req.body; // Grade from the request body

    if (!grade) {
      return res
        .status(400)
        .json({ success: false, message: "Grade is required" });
    }

    // Ensure the submission exists
    const submission = await Submission.findById(id);
    if (!submission) {
      return res
        .status(404)
        .json({ success: false, message: "Submission not found" });
    }

    // Update the submission with the grade
    submission.grade = grade; // Set the grade in the submission
    await submission.save(); // Save the updated submission

    res.status(200).json({ success: true, submission });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error grading submission", error });
  }
};

const express = require("express");
const {
  createFeedback,
  getFeedbacks,
} = require("../controllers/feedbackController");

const { verifyFeedback } = require("../middlewares/feedbacks");
const router = express.Router();
router.post("/", verifyFeedback, createFeedback);
router.get("/", getFeedbacks);

module.exports = router;

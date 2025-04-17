const express = require("express");
const {
  createFeedback,
  getFeedbacks,
} = require("../controllers/feedback-controller");
const router = express.Router();
router.post("/", createFeedback);
router.get("/", getFeedbacks);

module.exports = router;

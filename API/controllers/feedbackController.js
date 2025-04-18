const Feedback = require("../models/feedbackSchema");

const getFeedbacks = async (req, res) => {
  console.log(req.body);
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFeedback = async (req, res) => {
  console.log(req.body);
  const { text, category } = req.body;

  try {
    const feedback = new Feedback({ text, category });
    await feedback.save();
    res.status(200).json({
      message: "Votre feedback a bien été pris en compte !",
      feedback,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi du formulaire." });
  }
};

module.exports = { getFeedbacks, createFeedback };

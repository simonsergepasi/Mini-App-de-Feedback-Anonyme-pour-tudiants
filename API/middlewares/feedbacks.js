import { z } from "zod";

const feedbackSchema = z.object({
  text: z.string().max(255).default(""),
  category: z.string().default(""),
});

export const verifyFeedback = async (req, res, next) => {
  try {
    const result = feedbackSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur" });
    return;
  }
};

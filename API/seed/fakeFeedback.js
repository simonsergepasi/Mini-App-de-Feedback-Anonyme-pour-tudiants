// seed/seedFakeFeedbacks.js

require("dotenv").config();
const mongoose = require("mongoose");
const Feedback = require("../models/feedback.schema");
const { faker } = require("@faker-js/faker");

const categories = ["Cours", "Organisation", "Autre"];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    await Feedback.deleteMany({});
    console.log("🧹 Anciennes données supprimées");

    const fakeFeedbacks = Array.from({ length: 30 }, () => ({
      text: faker.lorem.sentence({ min: 8, max: 15 }),
      category: faker.helpers.arrayElement(categories),
    }));

    await Feedback.insertMany(fakeFeedbacks);
    console.log("✅ Données faker insérées !");
  } catch (err) {
    console.error("❌ Erreur :", err);
  } finally {
    await mongoose.disconnect();
  }
}

seedDB();

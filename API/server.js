require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const feedbackRoutes = require("./routes/feedbacks");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/feedbacks", feedbackRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`connected to db and listening on port : ${port}`);
    });
  })
  .catch((err) => console.log(err));

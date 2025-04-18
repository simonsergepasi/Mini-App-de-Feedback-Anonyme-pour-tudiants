require("dotenv").config()
const express = require("express")
const connectDB = require("./db/db")
const feedbackRoutes = require("./routes/feedbacks")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use("/api/feedbacks", feedbackRoutes)

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 4000
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
}

module.exports = app

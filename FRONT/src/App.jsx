import { useState, useEffect } from "react";
import "./App.css";
import { createFeedback, getFeedbacks } from "./services/feedback";

const categories = ["Tous", "Cours", "Organisation", "Autre"];

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Cours");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [responseMessage, setResponseMesssage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFeedbacks();
        if (data) {
          const sortedFeedbacks = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setFeedbacks(sortedFeedbacks);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des feedbacks :", err);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newFeedback = {
      text,
      category,
    };
    try {
      const response = await createFeedback(newFeedback);
      console.log(response);

      if (response) {
        setFeedbacks([response.feedback, ...feedbacks]);
        setText("");
        setCategory("Cours");
        setResponseMesssage(response.message);
      }
    } catch (err) {
      console.error("Erreur lors de l’envoi du feedback :", err);
      alert("Une erreur est survenue lors de l’envoi du feedback.");
    }
  };
  const filteredFeedbacks =
    selectedCategory === "Tous"
      ? feedbacks
      : feedbacks.filter((fb) => fb.category === selectedCategory);

  return (
    <div className="app-container">
      <div className="feedback-wrapper">
        <h1 className="feedback-title">Feedback Anonyme</h1>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label>
              Choisis une catégorie :
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="feedback-select"
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <textarea
            placeholder="Laisse ton feedback ici..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            className="feedback-textarea"
          />
          <div className="center flex-col">
            <button type="submit" className="submit-button">
              Envoyer
            </button>
            <div className="message">
              {responseMessage && <p>{responseMessage}</p>}
            </div>
          </div>
        </form>

        <div className="filter-section">
          <label>
            Filtrer par catégorie :
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="feedback-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="feedback-list">
          <h2 className="feedback-count">
            {filteredFeedbacks.length} feedback(s)
          </h2>
          {filteredFeedbacks.map((fb, index) => (
            <div key={index} className="feedback-card">
              <p className="feedback-date">
                {new Date(fb.createdAt).toLocaleString("fr-FR")}
              </p>
              <p className="feedback-text">{fb.text}</p>

              <p className="feedback-category">
                <span className="category-sticker">{fb.category}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

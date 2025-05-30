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
  const [visibleCount, setVisibleCount] = useState(4);
  console.log(text);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFeedbacks();
        if (data) {
          setFeedbacks(data);
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
      if (response) {
        setFeedbacks([...feedbacks, response.feedback]);
        setText("");
        setCategory("Cours");
        setResponseMesssage(response.message);
      }
    } catch (err) {
      console.error("Erreur lors de l’envoi du feedback :", err);
      alert("Une erreur est survenue lors de l’envoi du feedback.");
    }
  };

  const filteredFeedbacks = (
    selectedCategory === "Tous"
      ? feedbacks
      : feedbacks.filter((fb) => fb.category === selectedCategory)
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const displayedFeedbacks = filteredFeedbacks.slice(0, visibleCount);

  return (
    <div className="app-container">
      <div className="feedback-wrapper">
        <div className="form-wrapper">
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
            <div className="textarea-wrapper">
              <textarea
                placeholder="Laisse ton feedback ici..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="4"
                className="feedback-textarea"
              />
              <p
                className="char-counter"
                style={{
                  color: text.length <= 10 ? "red" : "green",
                }}
              >
                {text.length} / 255
              </p>
            </div>

            <div className="center flex-col">
              <button
                type="submit"
                className={`submit-button ${
                  text.trim().length < 11 ? "disabled" : ""
                }`}
                disabled={text.trim().length < 11}
                aria-disabled={text.trim().length < 11}
              >
                Envoyer
              </button>
              <div className="error-message">
                {responseMessage && <p>{responseMessage}</p>}
              </div>
            </div>
          </form>
        </div>
        <div className="wall-wrapper">
          <div className="feedback-list">
            <h2 className="feedback-title">Mur des feedbacks</h2>
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
            <div className="cards-wrapper">
              {displayedFeedbacks.map((fb, index) => (
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

            {visibleCount < filteredFeedbacks.length && (
              <div className="center">
                <button
                  className="show-more-button"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  Afficher plus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

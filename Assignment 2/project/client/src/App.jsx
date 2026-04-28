import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ReviewCard from "./ReviewCard";
import AddReviewForm from "./AddReviewForm";
import EditReviewForm from "./EditReviewForm";
import Footer from "./Footer";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([]);
  const [currentView, setCurrentView] = useState("reviews");
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/reviews`)
      .then((response) => {
        setReviews(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const showReviews = () => setCurrentView("reviews");
  const showAddForm = () => setCurrentView("add");
  const showEditForm = (review) => {
    setReviewToEdit(review);
    setCurrentView("edit");
  };

  const addReview = async (newReview) => {
    try {
      const res = await axios.post(`${API_URL}/reviews`, newReview);
      setReviews((prev) => [res.data, ...prev]);
      setCurrentView("reviews");
      setFeedback("Review added successfully!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error(err);
      setFeedback("Feature currently disabled");
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  const updateReview = async (updatedReview) => {
    try {
      const res = await axios.put(
        `${API_URL}/reviews/${updatedReview._id}`,
        updatedReview,
      );
      setReviews((prev) =>
        prev.map((rev) => (rev._id === updatedReview._id ? res.data : rev)),
      );
      setCurrentView("reviews");
      setFeedback("Review updated successfully!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error(err);
      setFeedback("Feature currently disabled");
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`${API_URL}/reviews/${id}`);
      setReviews((prev) => prev.filter((rev) => rev._id !== id));
      setFeedback("Review deleted successfully!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error(err);
      setFeedback("Feature currently disabled");
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  return (
    <div>
      <Navbar showReviews={showReviews} showAddForm={showAddForm} />

      <main>
        {feedback && <div className="feedback-message">{feedback}</div>}

        {currentView === "reviews" && (
          <div className="reviews-container">
            {isLoading ? ( // 3. ADDED
              <div className="spinner"></div>
            ) : (
              reviews.map((review, index) => (
                <div className="review-wrapper" key={review._id}>
                  <ReviewCard review={review} />
                  <div
                    className={`review-actions ${index % 2 === 0 ? "left" : "right"}`}
                  >
                    <button
                      className="btn btn-small"
                      onClick={() => showEditForm(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-small btn-delete"
                      onClick={() => deleteReview(review._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {currentView === "add" && <AddReviewForm addReview={addReview} />}
        {currentView === "edit" && reviewToEdit && (
          <EditReviewForm review={reviewToEdit} updateReview={updateReview} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

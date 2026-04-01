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

  useEffect(() => {
    axios
      .get("http://localhost:3003/reviews")
      .then((response) => setReviews(response.data))
      .catch((err) => console.error(err));
  }, []);

  const showReviews = () => setCurrentView("reviews");
  const showAddForm = () => setCurrentView("add");
  const showEditForm = (review) => {
    setReviewToEdit(review);
    setCurrentView("edit");
  };

  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]);
    setCurrentView("reviews");
    setFeedback("Review added successfully!");
    setTimeout(() => setFeedback(""), 3000);
  };

  const updateReview = (updatedReview) => {
    setReviews(
      reviews.map((rev) => (rev._id === updatedReview._id ? updatedReview : rev))
    );
    setCurrentView("reviews");
    setFeedback("Review updated successfully!");
    setTimeout(() => setFeedback(""), 3000);
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((rev) => rev._id !== id));
    setFeedback("Review deleted successfully!");
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div>
      <Navbar
        showReviews={showReviews}
        showAddForm={showAddForm}
      />

      <main>
        {feedback && (
          <div className="feedback-message">
            {feedback}
          </div>
        )}

        {currentView === "reviews" && (
          <div className="reviews-container">
            {reviews.map((review, index) => (
            <div className="review-wrapper" key={review._id}>
            <ReviewCard review={review} />
                <div className={`review-actions ${index % 2 === 0 ? "left" : "right"}`}>
                  <button
                    className="btn btn-small"
                    onClick={() => showEditForm(review)}>Edit</button>
                  <button
                    className="btn btn-small btn-delete"
                    onClick={() => {
                      setReviews(reviews.filter((rev) => rev._id !== review._id));
                      setFeedback("Review deleted successfully!");
                      setTimeout(() => setFeedback(""), 3000);
                    }}>Delete</button>
            </div>
          </div>
))}
          </div>
        )}

        {currentView === "add" && <AddReviewForm addReview={addReview} />}
        {currentView === "edit" && reviewToEdit && (
          <EditReviewForm
            review={reviewToEdit}
            updateReview={updateReview}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
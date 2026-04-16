import { useState } from "react";
import Navbar from "./Navbar";
import ReviewCard from "./ReviewCard";
import AddReviewForm from "./AddReviewForm";
import EditReviewForm from "./EditReviewForm";
import Footer from "./Footer";
import "./App.css";

// REVIEW: Hard-coded initial data duplicates seed data in server/api.js. Consider
// fetching from the API on mount instead so the frontend stays in sync with the database.
const initialReviews = [
  {
    _id: "1",
    name: "Miyakodori",
    address: "Upplandsgatan 7",
    image: "Miyakodori.jpg",
    text: "Miyakodori is a vibrant yet relaxed Japanese izakaya...",
    standouts: ["pork belly skewers", "chicken liver mousse with milk bread"],
  },
  {
    _id: "2",
    name: "Lu",
    address: "Skånegatan 88",
    image: "Lu.jpg",
    text: "Lu serves Cantonese street style food from Hong Kong...",
    standouts: ["pork dumplings", "beef noodles"],
  },
];

function App() {
  const [reviews, setReviews] = useState(initialReviews);
  // REVIEW: Using raw string literals ("reviews", "add", "edit") for view routing is
  // error-prone. Extract these into constants or an enum to avoid silent typo bugs.
  const [currentView, setCurrentView] = useState("reviews");
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [feedback, setFeedback] = useState("");

  // REVIEW: The setTimeout calls in addReview, updateReview, and deleteReview are never
  // cleaned up. If the component unmounts before 3 seconds, this causes a React
  // state-update-on-unmounted-component warning. Use useEffect cleanup or useRef to
  // cancel the timer.

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
      reviews.map((rev) =>
        rev._id === updatedReview._id ? updatedReview : rev,
      ),
    );
    setCurrentView("reviews");
    setFeedback("Review updated successfully!");
    setTimeout(() => setFeedback(""), 3000);
  };

  // REVIEW: deleteReview is defined here but never called. The Delete button below
  // inlines duplicate logic instead of calling this function. Either use this function
  // in the onClick handler or remove it to avoid dead code.
  const deleteReview = (id) => {
    setReviews(reviews.filter((rev) => rev._id !== id));
    setFeedback("Review deleted successfully!");
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div>
      <Navbar showReviews={showReviews} showAddForm={showAddForm} />

      <main>
        {feedback && <div className="feedback-message">{feedback}</div>}

        {currentView === "reviews" && (
          <div className="reviews-container">
            {/* REVIEW: Inconsistent indentation throughout this block (mix of 4-space
                and 8-space indents). Reformat for readability. */}
            {reviews.map((review, index) => (
              <div className="review-wrapper" key={review._id}>
                {/* REVIEW: ReviewCard accepts onEdit and onDelete props but they are not
                passed here. Either pass them or remove from the component signature. */}
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
                  {/* REVIEW: This delete handler duplicates the deleteReview function
                      defined above. Replace with onClick={() => deleteReview(review._id)}. */}
                  <button
                    className="btn btn-small btn-delete"
                    onClick={() => {
                      setReviews(
                        reviews.filter((rev) => rev._id !== review._id),
                      );
                      setFeedback("Review deleted successfully!");
                      setTimeout(() => setFeedback(""), 3000);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
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

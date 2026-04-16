import { useState, useEffect } from "react";
import "./ReviewForm.css";

// REVIEW: This component duplicates almost all of AddReviewForm.jsx. Extract a shared
// ReviewForm component that accepts an onSubmit handler and optional initialValues prop.

function EditReviewForm({ review, updateReview }) {
  // REVIEW: Initialising state to "" then immediately overwriting via useEffect is
  // unnecessary. Pass the review fields directly as initial values to useState, e.g.
  // useState(review?.name || ""). This avoids an extra render cycle.
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [standouts, setStandouts] = useState("");

  // REVIEW: The dependency array [review] compares by object reference. If App.jsx
  // ever recreates the review object (e.g. via spread), this effect will re-fire even
  // when the data hasn't changed. Consider depending on review._id instead.
  useEffect(() => {
    if (review) {
      setName(review.name);
      setAddress(review.address);
      setImage(review.image);
      setText(review.text);
      setStandouts(review.standouts.join(", "));
    }
  }, [review]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      ...review,
      name,
      address,
      image,
      text,
      // REVIEW: Same empty-string issue as AddReviewForm — splitting an empty standouts
      // field produces [""]. Add .filter(Boolean) after .map().
      standouts: standouts.split(",").map((s) => s.trim()),
    };

    updateReview(updated);
  };

  return (
    <div className="review-form">
      <form onSubmit={handleSubmit}>
        <h2>Edit Review</h2>

        <div className="form-group name-row">
          <div className="name-field">
            <label htmlFor="name">Restaurant name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Restaurant name..."
              required
            />
          </div>
          <div className="name-field">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address..."
              required
            />
          </div>
        </div>

        <div className="form-group">
          {/* REVIEW: Same as AddReviewForm — use type="url" for basic URL validation. */}
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Review text</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your review..."
            required
          />
        </div>

        <div className="form-group">
          {/* REVIEW: "Standout's" — same grammar error as AddReviewForm. Should be
              "Standouts". */}
          <label htmlFor="standouts">Standout's (comma separated)</label>
          <input
            type="text"
            id="standouts"
            value={standouts}
            onChange={(e) => setStandouts(e.target.value)}
            placeholder="Example: spring rolls, tuna tartare..."
            required
          />
        </div>

        <button type="submit" className="btn">
          Update Review
        </button>
      </form>
    </div>
  );
}

export default EditReviewForm;

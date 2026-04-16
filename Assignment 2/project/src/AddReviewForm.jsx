import { useState } from "react";
import "./ReviewForm.css";

// REVIEW: This component is nearly identical to EditReviewForm.jsx. Extract a shared
// ReviewForm component that accepts an onSubmit callback and optional initial values
// to eliminate the duplication.

function AddReviewForm({ addReview }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [standouts, setStandouts] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // REVIEW: Using Date.now().toString() for _id can produce collisions if two reviews
    // are created within the same millisecond. Use crypto.randomUUID() or a library
    // like uuid for reliable unique IDs.
    const newReview = {
      _id: Date.now().toString(),
      name,
      address,
      image,
      text,
      // REVIEW: If the user enters an empty string for standouts, this produces [""]
      // (an array with one empty string). Add a filter to remove empty entries, e.g.
      // .filter(Boolean) after .map().
      standouts: standouts.split(",").map((s) => s.trim()),
    };

    addReview(newReview);

    // REVIEW: This reset code is unreachable because addReview() (in App.jsx) changes
    // currentView to "reviews", which unmounts this component before these setters run.
    // Remove it or move the view change to happen after reset.
    setName("");
    setAddress("");
    setImage("");
    setText("");
    setStandouts("");
  };

  return (
    <div className="review-form">
      <form onSubmit={handleSubmit}>
        <h2>Add Review</h2>

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
          {/* REVIEW: No validation that the image field is a valid URL. Consider using
              type="url" instead of type="text" for basic browser validation. */}
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
          {/* REVIEW: "Standout's" is a grammar error — the apostrophe makes it
              possessive. It should be "Standouts (comma separated)". */}
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
          Add Review
        </button>
      </form>
    </div>
  );
}

export default AddReviewForm;

import { useState } from "react";
import "./ReviewForm.css";

function AddReviewForm({ addReview }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [standouts, setStandouts] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      _id: Date.now().toString(),
      name,
      address,
      image,
      text,
      standouts: standouts.split(",").map((s) => s.trim()),
    };

    addReview(newReview);

    // Reset form
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

        <button type="submit" className="btn">Add Review</button>
      </form>
    </div>
  );
}

export default AddReviewForm;
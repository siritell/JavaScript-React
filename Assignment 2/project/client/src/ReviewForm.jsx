import { useState, useEffect } from "react";
import "./ReviewForm.css";

function ReviewForm({ review, onSubmit }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [standouts, setStandouts] = useState("");

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

    const submitted = {
      ...(review || { _id: Date.now().toString() }),
      name,
      address,
      image,
      text,
      standouts: standouts.split(",").map((s) => s.trim()),
    };

    onSubmit(submitted);

    if (!review) {
      setName("");
      setAddress("");
      setImage("");
      setText("");
      setStandouts("");
    }
  };

  return (
    <div className="review-form">
      <form onSubmit={handleSubmit}>
        <h2>{review ? "Edit Review" : "Add Review"}</h2>

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
          <label htmlFor="standouts">Standouts (comma separated)</label>
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
          {review ? "Update Review" : "Add Review"}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;

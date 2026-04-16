import "./ReviewCard.css";

// REVIEW: onEdit and onDelete are destructured from props but never used anywhere in
// this component. Either wire them up to Edit/Delete buttons inside the card, or remove
// them from the parameter list to avoid confusion.
function ReviewCard({ review, onEdit, onDelete }) {
  return (
    <div className="review-card">
      {/* REVIEW: If review.image is a bare filename (e.g. "Miyakodori.jpg") rather than
          a full URL or a path relative to the public folder, the <img> will fail to load.
          Add an onError fallback or validate the image path. */}
      <img src={review.image} alt={review.name} className="review-image" />
      <div className="review-content">
        <h3>{review.name}</h3>
        {/* REVIEW: This <p> has no className="address" even though ReviewCard.css
            defines a .review-content p.address rule with special styling. Add the class
            to apply the intended styles. */}
        <p>{review.address}</p>
        <p>{review.text}</p>
        <p>
          {/* REVIEW: "Standout's" — incorrect apostrophe. Should be "Standouts". */}
          <b>Standout's:</b>
          <br />
          {/* REVIEW: Using array index as key is acceptable here because standouts are
              display-only, but if items could be reordered or removed, use a stable key. */}
          {review.standouts.map((item, idx) => (
            <span key={idx}>
              {item}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;

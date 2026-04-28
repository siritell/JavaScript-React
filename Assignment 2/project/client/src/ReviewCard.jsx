import "./ReviewCard.css";

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <img
        src={`/${review.image}`}
        alt={review.name}
        className="review-image"
      />
      <div className="review-content">
        <h3>{review.name}</h3>
        <p>{review.address}</p>
        <p>{review.text}</p>
        <p>
          <b>Standouts:</b>
          <br />
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

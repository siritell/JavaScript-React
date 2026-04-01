import "./Navbar.css";

function Navbar({ showAddForm, showReviews }) {
  return (
    <header className="navbar">
      <h1>Hey Siri...</h1>
      <nav>
        <button className="btn" onClick={showReviews}>Reviews</button>
        <button className="btn" onClick={showAddForm}>Add Review</button>
      </nav>
    </header>
  );
}

export default Navbar;
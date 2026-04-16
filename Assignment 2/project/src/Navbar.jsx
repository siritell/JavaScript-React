import "./Navbar.css";

function Navbar({ showAddForm, showReviews }) {
  return (
    // REVIEW: Using <header> with className="navbar" is fine, but the semantic role
    // should include a <nav> with an aria-label for accessibility. The <nav> below is
    // good — consider also adding aria-label="Main navigation".
    <header className="navbar">
      <h1>Hey Siri...</h1>
      <nav>
        {/* REVIEW: There is no visual indication of which view is currently active.
            Consider adding an "active" class to the current button so users know
            where they are. */}
        <button className="btn" onClick={showReviews}>
          Reviews
        </button>
        <button className="btn" onClick={showAddForm}>
          Add Review
        </button>
      </nav>
    </header>
  );
}

export default Navbar;

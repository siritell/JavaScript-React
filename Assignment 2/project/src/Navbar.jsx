import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <h1>Hey Siri...</h1>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Reviews</a></li>
                <li><a href="#">Add Review</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
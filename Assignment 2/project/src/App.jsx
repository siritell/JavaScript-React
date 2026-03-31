import { useState } from "react";
import Navbar from "./Navbar";
import ReviewCard from "./ReviewCard";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([
  {
    name: "Miyakodori",
    address: "Upplandsgatan 7",
    image: "Miyakodori.jpg",
    text: "Miyakodori is a vibrant yet relaxed Japanese izakaya. You can pick your favourites from the menu, choose a special from their black board, or leave the choice to your server and go for the omakase. They have a separate bar as well, where you can enjoy drinks as well as eat.",
    standouts: ["pork belly skewers", "chicken liver mousse with milk bread"]
  },
  {
    name: "Lu",
    address: "Skånegatan 88",
    image: "Lu.jpg",
    text: "Lu serves Cantonese street style food from Hong Kong, in a chaotic yet cosy, canteen like setting. If you are fortunate to live (somewhat) close by, they also offer take away, which means you can enjoy their food even if it's packed.",
    standouts: ["pork dumplings", "beef noodles"]
  }
]);

  return (
    <div>
      <Navbar />

      <div className="reviews-container">
      {reviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
      </div>
    </div>
  );
}

export default App;
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://heysiri-blog.vercel.app",
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 3003;

const client = new MongoClient(process.env.MONGO_URI);

let reviewsCollection;

async function startServer() {
  try {
    await client.connect();
    const db = client.db("restaurantBlog");
    reviewsCollection = db.collection("reviews");

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();

app.post("/seed", async (req, res) => {
  await reviewsCollection.deleteMany({});

  await reviewsCollection.insertMany([
    {
      name: "Miyakodori",
      address: "Upplandsgatan 7",
      image: "Miyakodori.jpg",
      text: "Miyakodori is a vibrant yet relaxed Japanese izakaya. You can pick your favourites from the menu, choose a special from their black board, or leave the choice to your server and go for the omakase. They have a separate bar as well, where you can enjoy drinks as well as eat.",
      standouts: ["pork belly skewers", "chicken liver mousse with milk bread"],
    },
    {
      name: "Lu",
      address: "Skånegatan 88",
      image: "Lu.jpg",
      text: "Lu serves Cantonese street style food from Hong Kong, in a chaotic yet cosy, canteen like setting. If you are fortunate to live (somewhat) close by, they also offer take away, which means you can enjoy their food even if it's packed.",
      standouts: ["pork dumplings", "beef noodles"],
    },
  ]);

  res.send("Seeded!");
});

app.get("/reviews", async (req, res) => {
  try {
    const reviews = await reviewsCollection.find({}).toArray();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

app.get("/reviews/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.sendStatus(400);

  const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });
  if (!review) return res.sendStatus(404);

  res.status(200).json(review);
});

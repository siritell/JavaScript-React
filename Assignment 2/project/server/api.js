const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
// REVIEW: CORS is fully open with no origin restriction. In production, specify allowed
// origins, e.g. cors({ origin: "http://localhost:3000" }), to prevent unwanted
// cross-origin requests.
app.use(cors());
app.use(express.json());

// REVIEW: The port is hard-coded. Use an environment variable (process.env.PORT || 3003)
// so it can be configured without changing code.
const PORT = 3003;

// REVIEW: The MongoDB connection string is hard-coded with no authentication. Use an
// environment variable (e.g. process.env.MONGODB_URI) to keep credentials out of source.
const client = new MongoClient("mongodb://localhost:27017");
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
    // REVIEW: After logging the error the process stays alive in a broken state.
    // Call process.exit(1) here so the failure is surfaced clearly.
  }
}

// REVIEW: No graceful shutdown handler. Add a SIGINT/SIGTERM listener that calls
// client.close() to cleanly release the MongoDB connection on shutdown.

startServer();

// REVIEW: The /seed endpoint uses GET but performs destructive write operations
// (deleteMany + insertMany). This should be a POST (or at minimum protected) to prevent
// accidental triggering by crawlers, prefetch, or browser link previews.
// REVIEW: No try-catch around the database calls — an error here will crash with an
// unhandled promise rejection instead of returning a proper error response.
app.get("/seed", async (req, res) => {
  await reviewsCollection.deleteMany({});

  await reviewsCollection.insertMany([
    {
      name: "Miyakodori",
      address: "Upplandsgatan 7",
      image: "Miyakodori.jpg",
      text: "Miyakodori is a vibrant yet relaxed Japanese izakaya...",
      standouts: ["pork belly skewers", "chicken liver mousse with milk bread"],
    },
    {
      name: "Lu",
      address: "Skånegatan 88",
      image: "Lu.jpg",
      text: "Lu serves Cantonese street style food from Hong Kong...",
      standouts: ["pork dumplings", "beef noodles"],
    },
  ]);

  res.send("Seeded!");
});

// REVIEW: Inconsistent indentation — the try block below uses a tab while the rest of
// the file uses spaces.
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await reviewsCollection.find({}).toArray();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// REVIEW: No try-catch here — if the database query throws (e.g. connection lost), the
// request will hang and eventually time out instead of returning a 500 error.
app.get("/reviews/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.sendStatus(400);

  const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });
  if (!review) return res.sendStatus(404);

  res.status(200).json(review);
});

// REVIEW: The API only has GET routes. There are no POST, PUT, or DELETE endpoints, so
// the frontend cannot persist any create/edit/delete operations to the database. Add
// these CRUD endpoints to make the API fully functional.

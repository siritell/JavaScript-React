const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const PORT = 3003;

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
  }
}

startServer();

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
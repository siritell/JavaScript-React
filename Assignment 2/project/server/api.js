// server/api.js
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const PORT = 3003; // API will run here

const client = new MongoClient("mongodb://localhost:27017");
let reviewsCollection;

// Connect to MongoDB
async function startServer() {
    await client.connect();
    const db = client.db("restaurantBlog");
    reviewsCollection = db.collection("reviews");

    app.listen(PORT, () => {
        console.log("API running on port " + PORT);
    });
}

startServer();

// Get all reviews
app.get("/reviews", async (req, res) => {
    const reviews = await reviewsCollection.find({}).toArray();
    res.status(200).json(reviews);
});

// Get single review by ID
app.get("/reviews/:id", async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.sendStatus(400);

    const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });
    if (!review) return res.sendStatus(404);

    res.status(200).json(review);
});

// Add a new review
app.post("/reviews", async (req, res) => {
    const review = {
        name: req.body.name,
        address: req.body.address,
        image: req.body.image || "", // optional for now
        text: req.body.text,
        standouts: req.body.standouts || [],
        createdAt: new Date(),
    };

    if (!review.name || !review.text) return res.sendStatus(400);

    await reviewsCollection.insertOne(review);
    res.status(201).json(review);
});

// Delete a review
app.delete("/reviews/:id", async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.sendStatus(400);

    const result = await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.sendStatus(404);

    res.sendStatus(204);
});

// Optional: Update a review (for editing)
app.put("/reviews/:id", async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.sendStatus(400);

    const updatedFields = {
        name: req.body.name,
        address: req.body.address,
        image: req.body.image,
        text: req.body.text,
        standouts: req.body.standouts,
    };

    const result = await reviewsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedFields }
    );

    if (result.matchedCount === 0) return res.sendStatus(404);

    const updatedReview = await reviewsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(updatedReview);
});
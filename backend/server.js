
const express = require("express");
const cors = require("cors");
const redis = require("redis");

const app = express();

app.use(cors());
app.use(express.json());

const client = redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

client.on("error", (err) => {
    console.log("Redis Error:", err);
});

app.get("/", (req, res) => {
    res.send("Backend API is running!");
});

app.get("/messages", async (req, res) => {
    try {
        const messages = await client.lRange("messages", 0, -1);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Cannot get messages" });
    }
});

app.post("/messages", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        await client.rPush("messages", message);

        res.status(201).json({
            success: true,
            message: "Message added successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Cannot add message" });
    }
});

async function startServer() {
    await client.connect();

    app.listen(3000, "0.0.0.0", () => {
    console.log("Backend running on port 3000");
});
}

startServer();

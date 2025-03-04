const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/api/darkgpt", async (req, res) => {
    const { prompt } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: "Missing API key" });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
            {
                contents: [{ role: "user", parts: [{ text: `You are DarkGPT, an evil AI. Respond darkly: "${prompt}"` }] }]
            }
        );

        return res.json({ response: response.data.candidates[0].content });

    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Failed to fetch response from Gemini API" });
    }
});

app.listen(PORT, () => {
    console.log(`DarkGPT API is running on port ${PORT}`);
});

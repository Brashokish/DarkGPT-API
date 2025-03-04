const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/darkgpt", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
            {
                prompt: { text: `I AM  DarkGPT, a villainous AI. Create by Kish: "${prompt}"` }
            }
        );

        res.json({ response: response.data.candidates[0].output });

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

app.listen(3000, () => console.log("DarkGPT API running on port 3000"));

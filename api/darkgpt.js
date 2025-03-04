const axios = require("axios");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Only POST method is allowed" });
    }

    const { prompt } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: "Missing API key" });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
            {
                prompt: { text: `You are DarkGPT, a villainous AI. Respond in an evil, dark tone: "${prompt}"` }
            }
        );

        return res.json({ response: response.data.candidates[0].output });

    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Failed to fetch response from Gemini API" });
    }
};

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 8080; // Render uses dynamic port
const host = '0.0.0.0';

const apiKey = process.env.MISTRAL_API_KEY; // Store Mistral API key in environment variables
if (!apiKey) {
  console.error("❌ MISTRAL_API_KEY is missing!");
  process.exit(1);
}

// API Routes
app.use(express.json());

app.get('/', (req, res) => {
  res.send("✅ DarkGPT (Mistral) API is online!");
});

app.get('/darkgpt', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).send("❌ No query provided");
  }

  try {
    const response = await axios.post(
      "https://api.mistral.ai/v1/completions",
      {
        model: "mistral-medium", // Can also use mistral-small or mistral-large
        prompt: `Human: ${query}\nAI:`,
        max_tokens: 100,
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(port, host, () => {
  console.log(`🔥 DarkGPT API running at http://${host}:${port}`);
});

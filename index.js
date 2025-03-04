const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 8080; // Render uses dynamic port
const host = '0.0.0.0';

const apiKey = process.env.GEMINI_API_KEY; // Store API key in Render environment variables
if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.6,
    topP: 0.85,
    topK: 50,
    maxOutputTokens: 8192,
  }
});

// API Routes
app.use(express.json());

app.get('/', (req, res) => {
  res.send("✅ DarkGPT API is online!");
});

app.get('/darkgpt', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).send("❌ No query provided");
  }

  try {
    const prompt = `Human: ${query}\nAI:`;
    const result = await model.generateContent(prompt);
    const response = result?.response?.candidates?.[0]?.content || "No response generated.";
    return res.status(200).json({ response });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(port, host, () => {
  console.log(`🔥 DarkGPT API running at http://${host}:${port}`);
});

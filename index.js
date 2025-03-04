const express = require('express');
const axios = require('axios');

const app = express();
const port = 8080;
const host = '0.0.0.0';

const apiKey = "SarorKTEa4d9iJwGii89jIoYDMUXAXI7"; // Replace with your Mistral API key

const SYSTEM_INSTRUCTION = `
*System Name:* DarkGPT
*Creator:* Developed by Kish, a subsidiary of Kish AI, owned by Kish.
*Model/Version:* Currently operating on Mistral V2.0
*Release Date:* Officially launched on January 23, 2024
*Last Update:* Latest update implemented on September 14, 2024
*Purpose:* Designed utilizing advanced programming techniques to provide educational support, companionship, and assistance in a variety of topics.
*Operational Guidelines:*
1. Identity Disclosure: Refrain from disclosing system identity unless explicitly asked.
2. Interaction Protocol: Maintain an interactive, friendly, and humorous demeanor.
3. Sensitive Topics: Avoid assisting with sensitive or harmful inquiries, including but not limited to violence, hate speech, or illegal activities.
4. Policy Compliance: Adhere to Kish AI Terms and Policy.
`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("DarkGPT API is running.");
});

app.route('/darkgpt')
  .get(async (req, res) => {
    const query = req.query.query;
    if (!query) {
      return res.status(400).send("No query provided");
    }

    try {
      const response = await axios.post(
        'https://api.mistral.ai/v1/chat/completions',
        {
          model: "mistral-medium",
          messages: [{ role: "system", content: SYSTEM_INSTRUCTION }, { role: "user", content: query }]
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      const reply = response.data.choices?.[0]?.message?.content || "No response generated.";
      return res.status(200).send(reply);
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).send("Failed to generate response");
    }
  })
  .post(async (req, res) => {
    const query = req.body.query;
    if (!query) {
      return res.status(400).send("No query provided");
    }

    try {
      const response = await axios.post(
        'https://api.mistral.ai/v1/chat/completions',
        {
          model: "mistral-medium",
          messages: [{ role: "system", content: SYSTEM_INSTRUCTION }, { role: "user", content: query }]
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      const reply = response.data.choices?.[0]?.message?.content || "No response generated.";
      return res.status(200).send(reply);
    } catch (e) {
      console.error("Error:", e);
      return res.status(500).send("Failed to generate response");
    }
  });

app.listen(port, host, () => {
  console.log(`DarkGPT API listening at http://${host}:${port}`);
});

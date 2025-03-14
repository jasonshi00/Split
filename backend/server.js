const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = "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"; // Replace with your actual API key
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile"; // You can change this to another available model

// Function to query Groq API
async function fetchCategoryFromGroq(merchant) {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL,
        messages: [
          { role: "user", content: `In one word with no period, what category does the merchant '${merchant}' belong to from these options: Shopping, Income, Rent, Transportation, or only if necessary, Other?` }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const category = response.data.choices[0].message.content.trim();
    return category;
  } catch (error) {
    console.error('Error querying Groq API:', error.message);
    throw new Error('Error fetching data from Groq API');
  }
}

// API route to handle category fetch by merchant name
app.post('/api/get-category', async (req, res) => {
  console.log("here")
  const { merchant } = req.body;

  if (!merchant) {
    return res.status(400).json({ error: 'Merchant name is required' });
  }

  try {
    const category = await fetchCategoryFromGroq(merchant);
    return res.json({ category });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Send message and get AI response
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a career advisor assistant. Provide helpful, professional advice about careers, job searching, and professional development."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const response = completion.choices[0].message.content;

    res.json({
      response
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Error processing message' });
  }
});

module.exports = router;

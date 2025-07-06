import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY); // DEBUG: should log actual key

const genAI = new GoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    apiVersion: 'v1'
  });
  

router.post('/analyze', async (req, res) => {
  const { answers, questions } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Analyze the following quiz answers and generate a short summary:\n\n${questions.map(
      (q, i) => `${i + 1}. ${q} ${answers[i]}`
    ).join('\n')}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    res.json({ result: text });
  } catch (error) {
    console.error('Gemini analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze quiz responses.' });
  }
});

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Load resume data
const resumeData = JSON.parse(fs.readFileSync("./resumeData.json", "utf-8"));

// Gemini Init
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Chat API
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  const userMessage = messages[messages.length - 1].content;

  try {
    const prompt = `
You are Sunil Rana's personal AI assistant. Answer using only the following resume data:

${JSON.stringify(resumeData, null, 2)}

User: ${userMessage}
AI:
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("❌ Gemini Error:", err);
    res.status(500).json({ reply: "❌ Server error. Try again later." });
  }
});

app.listen(5000, () =>
  console.log("✅ Gemini server running on http://localhost:5000")
);

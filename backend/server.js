import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// Load Resume Data
// ===============================
const resumeData = JSON.parse(
  fs.readFileSync("./resumeData.json", "utf-8")
);

// ===============================
// Gemini Initialization (FIXED)
// ===============================
let genAI = null;
let model = null;

try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // ✅ ONLY STABLE MODEL (NO 404)
    model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    console.log("✅ Gemini AI initialized successfully");
  } else {
    console.log("⚠️ GEMINI_API_KEY not found → Running in fallback mode");
  }
} catch (error) {
  console.log("❌ Gemini initialization failed:", error.message);
}

// ===============================
// Health Check
// ===============================
app.get("/api/health", (req, res) => {
  res.json({
    status: "running",
    mode: model ? "Gemini AI" : "Fallback only",
    timestamp: new Date().toISOString(),
  });
});

// ===============================
// Chat API
// ===============================
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !messages.length) {
      return res.status(400).json({
        reply: "Please send a valid message.",
      });
    }

    const userMessage = messages[messages.length - 1].content;

    // ===============================
    // Try Gemini First
    // ===============================
    if (model) {
      try {
        const prompt = `
You are Sunil Rana's personal AI assistant.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

RULES:
- Answer in same language (English / Hindi / Mixed)
- Use ONLY resume data
- Max 3–4 sentences
- Be friendly & clear

USER QUESTION:
"${userMessage}"

ANSWER:
`;

        const result = await model.generateContent(prompt);
        const reply = result.response.text();

        return res.json({ reply });
      } catch (err) {
        console.log("❌ Gemini failed, switching to fallback:", err.message);
      }
    }

    // ===============================
    // Fallback Response
    // ===============================
    const reply = generateFallbackResponse(userMessage, resumeData);
    res.json({ reply });

  } catch (error) {
    console.error("❌ Chat API error:", error);
    res.status(500).json({
      reply: "Server error. Please try again later.",
    });
  }
});

// ===============================
// Fallback Logic (Hindi + English)
// ===============================
function generateFallbackResponse(message, resumeData) {
  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("namaste")) {
    return "👋 Namaste! Main Sunil Rana ka AI assistant hoon. Aap kya janna chahte hain?";
  }

  if (msg.includes("who") || msg.includes("kaun")) {
    return "Sunil Rana ek Full Stack Developer aur Machine Learning enthusiast hain, jo MERN stack aur AI projects pe kaam karte hain.";
  }

  if (msg.includes("skill") || msg.includes("technology") || msg.includes("aata")) {
    return "Sunil ko HTML5, CSS3, JavaScript, React, Node.js, MongoDB, Docker, aur Machine Learning ka strong knowledge hai.";
  }

  if (msg.includes("project")) {
    return "Sunil ne HEART IQ (AI health prediction) aur EXCEL ANALYTICS (data visualization platform) jaise projects banaye hain.";
  }

  if (msg.includes("education") || msg.includes("padhai")) {
    return "Sunil ne MCA (Master of Computer Applications) complete ki hai with 9.0 CGPA in 2025.";
  }

  if (msg.includes("email")) {
    return `📧 Email: ${resumeData.personal_info.email}`;
  }

  if (msg.includes("phone") || msg.includes("number")) {
    return `📞 Phone: ${resumeData.personal_info.phone}`;
  }

  if (msg.includes("linkedin")) {
    return `💼 LinkedIn: ${resumeData.personal_info.linkedin}`;
  }

  return "Aap Sunil ke skills, projects, education ya contact details ke baare me pooch sakte hain 🙂";
}

// ===============================
// Test Gemini
// ===============================
app.get("/api/test", async (req, res) => {
  if (!model) {
    return res.json({
      success: false,
      message: "Gemini not configured, fallback mode active",
    });
  }

  try {
    const result = await model.generateContent("Say: Gemini working fine");
    res.json({
      success: true,
      response: result.response.text(),
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

// ===============================
// Server Start
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`🔍 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Test: http://localhost:${PORT}/api/test`);
  console.log(`💬 Chat: POST http://localhost:${PORT}/api/chat`);
  console.log(`🤖 Mode: ${model ? "Gemini AI" : "Fallback only"}`);
});

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

// Initialize Gemini AI with error handling
let genAI = null;
let model = null;

try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Use the latest model names that work with current API
    model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash"  // or "gemini-1.0-pro"
    });
    console.log("✅ Gemini AI initialized successfully");
  } else {
    console.log("ℹ️  GEMINI_API_KEY not found, running in basic mode");
  }
} catch (error) {
  console.log("❌ Gemini initialization failed:", error.message);
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "running", 
    message: model ? "Gemini AI connected" : "Basic mode (No Gemini)",
    timestamp: new Date().toISOString()
  });
});

// Chat route with both Gemini and fallback
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !messages.length) {
      return res.status(400).json({ 
        reply: "Please send a message." 
      });
    }

    const userMessage = messages[messages.length - 1].content;

    // Try Gemini first if available
    if (model) {
      try {
        const prompt = `
You are Sunil Rana's personal AI assistant. Understand questions in English, Hindi, or mixed language.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

USER QUESTION: "${userMessage}"

IMPORTANT RULES:
1. Answer in the same language as the question (English/Hindi/Mixed)
2. If question is in Hindi, answer in simple Hindi
3. If question is in English, answer in English
4. Use only the resume data above
5. Be friendly, helpful and conversational
6. For simple questions like "Sunil kya karta hai?", give simple answers
7. Maximum 3-4 sentences

ANSWER:
        `;

        const result = await model.generateContent(prompt);
        const reply = result.response.text();
        return res.json({ reply });
      } catch (geminiError) {
        console.log("❌ Gemini failed, using fallback:", geminiError.message);
        // Continue to fallback
      }
    }

    // Fallback rule-based responses (Hindi support added)
    const reply = generateFallbackResponse(userMessage, resumeData);
    res.json({ reply });

  } catch (err) {
    console.error("❌ Chat Error:", err);
    res.status(500).json({ 
      reply: "❌ Service temporarily unavailable. Please try again." 
    });
  }
});

// Updated Fallback response generator with Hindi support
function generateFallbackResponse(userMessage, resumeData) {
  const message = userMessage.toLowerCase();

  // Hindi Questions
  if (message.includes("kya karta") || message.includes("karta hai") || message.includes("what does")) {
    return "Sunil ek software engineer hai jo websites aur AI applications banata hai. Wo health prediction aur data analysis ke projects pe kaam karta hai.";
  }
  else if (message.includes("kaun hai") || message.includes("who is")) {
    return "Sunil Rana ek talented software developer hai jinki expertise MERN stack aur machine learning mein hai. Wo complex problems ko solve karna pasand karte hain.";
  }
  else if (message.includes("number") || message.includes("phone")) {
    return `Sunil ka phone number hai: ${resumeData.personal_info.phone}. Aap directly call kar sakte hain.`;
  }
  else if (message.includes("email") || message.includes("mail")) {
    return `Sunil ka email address hai: ${resumeData.personal_info.email}. Aap email bhej sakte hain.`;
  }
  else if (message.includes("project") || message.includes("banaya")) {
    return "Sunil ne do main projects banaye hain: HEART IQ (heart disease prediction) aur EXCEL ANALYTICS (data analysis tool). Dono projects modern technology use karte hain.";
  }
  else if (message.includes("skill") || message.includes("aata hai")) {
    return `Sunil ko yeh technologies aati hain: React, Node.js, Python, MongoDB, Machine Learning. Wo full stack development karte hain.`;
  }
  else if (message.includes("company") || message.includes("naukar")) {
    return "Sunil ne ZIDIO DEVELOPMENT company mein internship ki thi, jahan unhone data analysis platform pe kaam kiya.";
  }
  else if (message.includes("padhai") || message.includes("education")) {
    return "Sunil ne Master of Computer Applications (MCA) Dayananda Sagar College se ki hai with 9.00 CGPA. Unki padhai 2025 mein complete hui.";
  }
  else if (message.includes("connect") || message.includes("contact") || message.includes("mile")) {
    return `Aap Sunil se in ways mein connect kar sakte hain:
📧 Email: ${resumeData.personal_info.email}
📞 Phone: ${resumeData.personal_info.phone}
💼 LinkedIn: ${resumeData.personal_info.linkedin}`;
  }
  else if (message.includes("hello") || message.includes("hi") || message.includes("namaste")) {
    return "Namaste! Main Sunil Rana ka AI assistant hoon. Aap Sunil ke baare mein kya janna chahenge?";
  }

  // English Questions
  else if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return "👋 Hello! I'm Sunil Rana's AI assistant. How can I help you today?";
  }
  else if (message.includes("skill") || message.includes("technology") || message.includes("tech")) {
    return `🔧 Sunil's skills include: React, Node.js, Python, MongoDB, Machine Learning. He specializes in MERN stack development and AI applications.`;
  }
  else if (message.includes("project")) {
    return `🚀 Sunil has built: HEART IQ (AI health prediction) and EXCEL ANALYTICS (data analysis platform). Both projects use modern web technologies and AI.`;
  }
  else if (message.includes("experience") || message.includes("work") || message.includes("job")) {
    return `💼 Sunil worked as an intern at ZIDIO DEVELOPMENT where he built data analysis features and improved system performance by 25%.`;
  }
  else if (message.includes("education") || message.includes("degree") || message.includes("study")) {
    return `🎓 Education: Master of Computer Applications from Dayananda Sagar College with 9.00/10 CGPA.`;
  }
  else if (message.includes("contact") || message.includes("email") || message.includes("phone") || message.includes("reach")) {
    return `📞 Contact Sunil at: 
Email - ${resumeData.personal_info.email}
Phone - ${resumeData.personal_info.phone}
LinkedIn - ${resumeData.personal_info.linkedin}`;
  }
  else if (message.includes("about") || message.includes("who") || message.includes("tell me about")) {
    return `👨‍💻 ${resumeData.personal_info.about_me}`;
  }
  else {
    return "I can help you with information about Sunil's skills, projects, experience, education, or contact details. What would you like to know?";
  }
}

// Test endpoint
app.get("/api/test", async (req, res) => {
  if (model) {
    try {
      const result = await model.generateContent("Say 'Test successful'");
      const response = await result.response;
      res.json({ 
        success: true, 
        message: "Gemini AI is working!",
        response: response.text()
      });
    } catch (error) {
      res.json({ 
        success: false, 
        message: "Gemini test failed",
        error: error.message,
        mode: "Using fallback mode"
      });
    }
  } else {
    res.json({ 
      success: true, 
      message: "Server is working in basic mode",
      mode: "Rule-based responses"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`🔍 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Test: http://localhost:${PORT}/api/test`);
  console.log(`💬 Chat: POST http://localhost:${PORT}/api/chat`);
  console.log(`🤖 Mode: ${model ? 'Gemini AI' : 'Basic rule-based'}`);
});
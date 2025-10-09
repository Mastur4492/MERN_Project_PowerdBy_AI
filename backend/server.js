import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";
configDotenv();

const app = express();
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);
app.use(express.json({ limit: "10mb" }));

const API_KEY = process.env.NEBIUS_API_KEY;

const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: API_KEY,
});

app.post("/api/explain-code", async (req, res) => {
    try {
        const { code, language } = req.body;
        if (!code) {
            return res.status(400).json({ error: "Code is required" });
        }
        const messages = [
            {
                role: "user",
                content: `Explain the following ${language || ""} code in detail:\n\n\`\`\`${language || ""}\n${code}\n\`\`\``
            }
        ]

        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages,
            max_tokens: 800,
            temperature: 0.3,
        });
        const explanation = response?.choices[0]?.message?.content; 

        if (!explanation) {
            return res.status(500).json({ error: "No explanation generated" }); 
        }

        res.json({ explanation, language: language || "Not specified" });

    } catch (error) {
        console.error("code explain Api error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

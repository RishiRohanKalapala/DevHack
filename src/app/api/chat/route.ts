import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error: unknown) {
        console.error("Gemini AI Error:", error);
        return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
    }
}

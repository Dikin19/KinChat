import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-flash",
});

export const imageToGenerativePart = (buffer: Buffer, mimeType: string) => ({
  inlineData: {
    data: buffer.toString("base64"),
    mimeType,
  },
});

export const documentToGenerativePart = (buffer: Buffer, mimeType: string) => ({
  inlineData: {
    data: buffer.toString("base64"),
    mimeType,
  },
});

export const audioToGenerativePart = (buffer: Buffer, mimeType: string) => ({
  inlineData: {
    data: buffer.toString("base64"),
    mimeType,
  },
});

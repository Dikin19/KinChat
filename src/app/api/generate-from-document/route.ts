import { NextRequest, NextResponse } from "next/server";
import { model, documentToGenerativePart } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const prompt =
      (formData.get("prompt") as string) || "Analyze this document";
    const document = formData.get("document") as File;

    if (!document) {
      return NextResponse.json(
        { error: "Document file is required" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await document.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create generative part
    const documentPart = documentToGenerativePart(buffer, document.type);

    const result = await model.generateContent([prompt, documentPart]);
    const response = await result.response;

    return NextResponse.json({
      output: response.text(),
      success: true,
    });
  } catch (error) {
    console.error("Error generating from document:", error);
    return NextResponse.json(
      { error: "Failed to analyze document" },
      { status: 500 }
    );
  }
}

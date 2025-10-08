import { NextRequest, NextResponse } from "next/server";
import { model, documentToGenerativePart } from "@/lib/gemini";

// Handle GET requests
export async function GET() {
  return NextResponse.json(
    {
      error: "This endpoint only accepts POST requests",
      message:
        "Please send a POST request with form data containing 'prompt' and 'document'",
    },
    { status: 405 }
  );
}

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

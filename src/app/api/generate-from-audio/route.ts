import { NextRequest, NextResponse } from "next/server";
import { model, audioToGenerativePart } from "@/lib/gemini";

// Handle GET requests
export async function GET() {
  return NextResponse.json(
    {
      error: "This endpoint only accepts POST requests",
      message:
        "Please send a POST request with form data containing 'prompt' and 'audio'",
    },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const prompt =
      (formData.get("prompt") as string) ||
      "Transcribe or analyze the following audio";
    const audio = formData.get("audio") as File;

    if (!audio) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await audio.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create generative part
    const audioPart = audioToGenerativePart(buffer, audio.type);

    const result = await model.generateContent([prompt, audioPart]);
    const response = await result.response;

    return NextResponse.json({
      output: response.text(),
      success: true,
    });
  } catch (error) {
    console.error("Error generating from audio:", error);
    return NextResponse.json(
      { error: "Failed to analyze audio" },
      { status: 500 }
    );
  }
}

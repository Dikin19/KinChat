import { NextRequest, NextResponse } from "next/server";
import { model, imageToGenerativePart } from "@/lib/gemini";

// Handle GET requests
export async function GET() {
  return NextResponse.json(
    {
      error: "This endpoint only accepts POST requests",
      message:
        "Please send a POST request with form data containing 'prompt' and 'image'",
    },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const prompt = (formData.get("prompt") as string) || "Describe the image";
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create generative part
    const imagePart = imageToGenerativePart(buffer, image.type);

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;

    return NextResponse.json({
      output: response.text(),
      success: true,
    });
  } catch (error) {
    console.error("Error generating from image:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";


// request sama dengan nextRequest yaitu mewakili permintaan http yang masuk.
// Berisi data seperti body, headers, method, dan URL. Digunakan untuk membaca data dari request client.
export async function POST(request: NextRequest) {

  try {

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "API configuration error",
          message:
            "GEMINI_API_KEY is not set. Please create a .env.local file with your Gemini API key.",
        },
        { status: 500 }
      );
    }

    const { prompt } = await request.json();

    if (!prompt) {
      // NextResponse: objek untuk membangun dan mengirim respons HTTP ke client.
      // Digunakan untuk mengatur status, body, dan headers respons.

      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );

    }

    // kita masukan prompt yang dimasukan oleh client dari fe didalam prompt
    const result = await model.generateContent(prompt);

    // disini kita masih menggunakan await untuk hasil result karena butuh await untuk mengembalikan promise
    const response = await result.response;

    return NextResponse.json({
      output: response.text(),
      success: true,
    });


  } catch (error) {

    console.error("Error generating text:", error);

    // Provide more specific error messages
    if (error instanceof Error) {

      if (error.message.includes("API_KEY")) {

        return NextResponse.json(

          {
            error: "API Key Error",
            message:
              "Invalid or missing Gemini API key. Please check your .env.local file.",
          },
          { status: 401 }

        );
        
      }

    }

    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}

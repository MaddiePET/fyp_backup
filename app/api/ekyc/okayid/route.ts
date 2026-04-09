import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { journeyId, imageBase64, docType } = await req.json();

    if (!journeyId || !imageBase64) {
      return NextResponse.json({ error: "Missing journeyId or image" }, { status: 400 });
    }
    
    console.log("Document verification request - journeyId:", journeyId, "docType:", docType);

    let requestBody: any;
    let apiEndpoint: string;

    if (docType === "passport") {
      // Use OkayDoc endpoint for passport
      apiEndpoint = "/okaydoc";
      requestBody = {
        journeyId,
        type: "passport",
        country: "OTHER",
        halfSizeImage: imageBase64,
      };
      console.log("Using OkayDoc endpoint for Passport");
    } else if (docType === "mykad") {
      // Use OkayDoc endpoint for MyKad
      apiEndpoint = "/okaydoc";
      requestBody = {
        journeyId,
        type: "nonpassport",
        idImageBase64Image: imageBase64,
        version: "7",
        docType: "mykad",
        landmarkCheck: "true",
        fontCheck: "true",
        microprintCheck: "true",
        photoSubstitutionCheck: "true",
        icTypeCheck: "true",
        colorMode: "true",
        hologram: "true",
        screenDetection: "true",
        ghostPhotoColorDetection: "true",
        idBlurDetection: "true",
        idBrightnessDetection: "true",
        faceBrightnessDetection: "true",
        contentSubstitution: "true",
      };
      console.log("Using OkayDoc endpoint for MyKad");
    } else {
      // Generic OkayID endpoint
      apiEndpoint = "/okayid";
      requestBody = {
        journeyId,
        base64ImageString: imageBase64,
        imageFormat: "JPG",
        imageEnabled: false,
        faceImageEnabled: false,
        cambodia: false,
      };
      console.log("Using OkayID endpoint for generic verification");
    }

    const fullUrl = `${process.env.INNOVA8TIF_API_URL}${apiEndpoint}`;
    console.log("Calling innov8tif API:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    console.log("innov8tif API response status:", response.status);

    let result;
    const responseText = await response.text();
    console.log("innov8tif API response text length:", responseText.length);
    
    try {
      result = responseText ? JSON.parse(responseText) : {};
      console.log("Parsed result - status:", result.status);
    } catch (parseError: any) {
      console.error("Failed to parse innov8tif response:", parseError.message);
      return NextResponse.json({ 
        error: "Invalid response from verification service", 
        details: `Response status: ${response.status}, Response length: ${responseText.length}` 
      }, { status: 500 });
    }
    
    // Forward the actual response status from innov8tif API
    if (!response.ok) {
      console.error("innov8tif API error (status " + response.status + "):", result);
      return NextResponse.json(result || { error: "Verification failed" }, { status: response.status });
    }
    
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Document verification error:", error.message, error.stack);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
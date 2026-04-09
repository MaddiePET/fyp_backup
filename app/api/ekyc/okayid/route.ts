import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { journeyId, imageBase64, docType } = await req.json();

    if (!journeyId || !imageBase64) {
      return NextResponse.json({ error: "Missing journeyId or image" }, { status: 400 });
    }
    
    console.log("Two-step document verification - journeyId:", journeyId, "docType:", docType);

    // Step 1: Call OkayID for OCR extraction and document identification
    console.log("Step 1: Calling OkayID for OCR extraction");
    const okayidUrl = `${process.env.INNOVA8TIF_API_URL}/okayid`;
    const okayidBody = {
      journeyId,
      base64ImageString: imageBase64,
      imageFormat: "JPG",
      imageEnabled: false,
      faceImageEnabled: false,
      cambodia: false,
    };

    const okayidResponse = await fetch(okayidUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(okayidBody),
    });

    console.log("OkayID response status:", okayidResponse.status);
    let okayidResult;
    const okayidText = await okayidResponse.text();

    try {
      okayidResult = okayidText ? JSON.parse(okayidText) : {};
      console.log("OkayID result - status:", okayidResult.status);
    } catch (parseError: any) {
      console.error("Failed to parse OkayID response:", parseError.message);
      return NextResponse.json({ 
        error: "OCR extraction failed", 
        details: parseError.message 
      }, { status: 500 });
    }

    if (!okayidResponse.ok) {
      console.error("OkayID error (status " + okayidResponse.status + "):", okayidResult);
      return NextResponse.json({ 
        error: "OCR extraction failed",
        okayidError: okayidResult 
      }, { status: okayidResponse.status });
    }

    // Step 2: Call OkayDoc for document authentication verification
    console.log("Step 2: Calling OkayDoc for authentication verification");
    
    let okaydocUrl: string;
    let okaydocBody: any;

    if (docType === "passport") {
      okaydocUrl = `${process.env.INNOVA8TIF_API_URL}/okaydoc`;
      okaydocBody = {
        journeyId,
        type: "passport",
        country: "OTHER",
        halfSizeImage: imageBase64,
      };
      console.log("Using OkayDoc for Passport verification");
    } else if (docType === "mykad") {
      okaydocUrl = `${process.env.INNOVA8TIF_API_URL}/okaydoc`;
      okaydocBody = {
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
      console.log("Using OkayDoc for MyKad verification");
    } else {
      return NextResponse.json({ 
        error: "Unsupported document type" 
      }, { status: 400 });
    }

    const okaydocResponse = await fetch(okaydocUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(okaydocBody),
    });

    console.log("OkayDoc response status:", okaydocResponse.status);
    let okaydocResult;
    const okaydocText = await okaydocResponse.text();

    try {
      okaydocResult = okaydocText ? JSON.parse(okaydocText) : {};
      console.log("OkayDoc result - status:", okaydocResult.status);
    } catch (parseError: any) {
      console.error("Failed to parse OkayDoc response:", parseError.message);
      return NextResponse.json({ 
        error: "Authentication verification failed", 
        details: parseError.message,
        ocrData: okayidResult
      }, { status: 500 });
    }

    if (!okaydocResponse.ok) {
      console.error("OkayDoc error (status " + okaydocResponse.status + "):", okaydocResult);
      return NextResponse.json({ 
        error: "Authentication verification failed",
        ocrData: okayidResult,
        authError: okaydocResult 
      }, { status: okaydocResponse.status });
    }

    // Both steps successful - return combined results
    console.log("Both verification steps successful");
    return NextResponse.json({
      status: "success",
      ocrExtraction: okayidResult,
      authenticationVerification: okaydocResult,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Document verification error:", error.message, error.stack);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
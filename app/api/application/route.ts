import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const data = await req.json();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const fullName = (data.personalInfo?.fullName || "").trim();
    const nameParts = fullName.split(/\s+/).filter(Boolean);
    const fname = nameParts[0] || null;
    const lname = nameParts.slice(1).join(" ") || null;

    // 1. Insert personal/home address first
    const homeAddressRes = await client.query(
      `
      INSERT INTO banka."Address" (
        add_1,
        add_2,
        postcode,
        state,
        country
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING add_id
      `,
      [
        data.personalInfo?.streetAddress || null,
        data.personalInfo?.city || null,
        data.personalInfo?.postal || null,
        data.personalInfo?.state || null,
        data.personalInfo?.country || "Malaysia",
      ]
    );

    const home_add = homeAddressRes.rows[0].add_id;

    // 2. Insert Customer using home_add FK
    const customerRes = await client.query(
      `
      INSERT INTO banka."Customer" (
        id_num,
        fname,
        lname,
        id_type,
        dob,
        ph_no_1,
        ph_no_2,
        email,
        home_add
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING cust_id
      `,
      [
        data.personalInfo?.id_num || null,
        fname,
        lname,
        "IC",
        data.personalInfo?.dob || null,
        data.phoneVerification?.ph_no_1 || null,
        data.phoneVerification?.ph_no_2 || null,
        data.contactInfo?.email || null,
        home_add,
      ]
    );

    const cust_id = customerRes.rows[0].cust_id;

    // 3. Insert User
    const userRes = await client.query(
      `
      INSERT INTO banka."User" (
        cust_id,
        username,
        password,
        status,
        img,
        sec_phrase,
        branch
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING user_id
      `,
      [
        cust_id,
        data.account?.username || null,
        data.account?.password || null,
        "PENDING",
        data.account?.profilePreview || null,
        data.account?.securityPhrase || null,
        data.businessAddress?.preferredBranch || null,
      ]
    );

    const user_id = userRes.rows[0].user_id;

    // 4. Insert business address
    const businessAddress = data.businessAddress?.businessAddress;
    const mailingAddress = data.businessAddress?.mailingAddress;
    const isMailingSameAsBusiness =
      data.businessAddress?.isMailingSameAsBusiness ?? true;

    const businessAddressRes = await client.query(
      `
      INSERT INTO banka."Address" (
        add_1,
        add_2,
        postcode,
        state,
        country
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING add_id
      `,
      [
        businessAddress?.streetAddress || null,
        businessAddress?.city || null,
        businessAddress?.postal || null,
        businessAddress?.state || null,
        businessAddress?.country || "Malaysia",
      ]
    );

    const bus_add_id = businessAddressRes.rows[0].add_id;

    // 5. Insert mailing address only if different
    let mail_add_id = bus_add_id;

    if (!isMailingSameAsBusiness) {
      const mailingAddressRes = await client.query(
        `
        INSERT INTO banka."Address" (
          add_1,
          add_2,
          postcode,
          state,
          country
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING add_id
        `,
        [
          mailingAddress?.streetAddress || null,
          mailingAddress?.city || null,
          mailingAddress?.postal || null,
          mailingAddress?.state || null,
          mailingAddress?.country || "Malaysia",
        ]
      );

      mail_add_id = mailingAddressRes.rows[0].add_id;
    }

    // 6. Insert Current_account
    await client.query(
      `
      INSERT INTO banka."Current_account" (
        user_id,
        reg_no,
        bus_name,
        bus_type,
        role,
        bus_ph_no,
        bus_email,
        start_date,
        bus_add_id,
        mail_add_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      `,
      [
        user_id,
        data.businessParticulars?.brn || data.businessParticulars?.reg_no || null,
        data.businessParticulars?.businessName || data.businessParticulars?.bus_name || null,
        data.businessParticulars?.businessType || data.businessParticulars?.bus_type || null,
        data.businessParticulars?.role || null,
        data.businessParticulars?.bus_ph_no || null,
        data.businessParticulars?.bus_email || null,
        data.businessParticulars?.startDate || data.businessParticulars?.start_date || null,
        bus_add_id,
        mail_add_id,
      ]
    );

    // 7. Insert supporting documents
    const supportingDocs = data.supportingDocuments || [];

    for (const doc of supportingDocs) {
      if (!doc?.name || !doc?.fileBase64) continue;

      const base64Part = doc.fileBase64.includes(",")
        ? doc.fileBase64.split(",")[1]
        : doc.fileBase64;

      const fileBuffer = Buffer.from(base64Part, "base64");

      await client.query(
        `
        INSERT INTO banka."Business_supporting_docs" (
          user_id,
          doc_name,
          doc_file
        )
        VALUES ($1,$2,$3)
        `,
        [user_id, doc.name, fileBuffer]
      );
    }

    await client.query("COMMIT");

    return NextResponse.json({
      message: "Success",
      cust_id,
      user_id,
      home_add,
      bus_add_id,
      mail_add_id,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Application submit error:", err);

    return NextResponse.json(
      {
        error: "Failed",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
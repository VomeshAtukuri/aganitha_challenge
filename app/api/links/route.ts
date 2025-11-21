import { db } from "@/lib/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
export function generateCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req: Request) {
  const { url, code: customCode } = await req.json();

  // Validate URL
  try { new URL(url); } 
  catch { return Response.json({ error: "Invalid URL" }, { status: 400 }); }

  let finalCode = customCode;

  
  if (!finalCode) {
    finalCode = generateCode(7);

    // Ensure no collision
    let exists = await db.select().from(links).where(eq(links.code, finalCode));

    while (exists.length) {
      finalCode = generateCode(7);
      exists = await db.select().from(links).where(eq(links.code, finalCode));
    }
  } else {
    // If user *did* provide code ensure uniqueness
    const exists = await db.select().from(links).where(eq(links.code, finalCode));
    if (exists.length) {
      return Response.json({ error: "Code already exists" }, { status: 409 });
    }
  }

  // Insert
  await db.insert(links).values({
    code: finalCode,
    url,
  });

  return Response.json({ ok: true, code: finalCode }, { status: 201 });
}

export async function GET() {
  const data = await db.select().from(links);
  return Response.json(data);
}


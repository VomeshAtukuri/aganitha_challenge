import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { links } from "@/db/schema";

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  console.log("particular code", code);
  const result = await db.select().from(links).where(eq(links.code, code));

  if (!result.length) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(result[0]);
}

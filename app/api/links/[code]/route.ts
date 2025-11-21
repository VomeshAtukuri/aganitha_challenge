import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { links } from "@/db/schema";

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  
  const result = await db.select().from(links).where(eq(links.code, code));

  if (!result.length) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(result[0]);
}

export async function DELETE(req: Request, { params } : { params: Promise<{ code: string }> }) {
  const { code } = await params;
  await db.delete(links).where(eq(links.code, code));
  return Response.json({ ok: true });
}


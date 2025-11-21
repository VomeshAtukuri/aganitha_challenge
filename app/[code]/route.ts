import { db } from "@/lib/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  const result = await db.select().from(links).where(eq(links.code, code));
  if (!result.length) return new Response("Not found", { status: 404 });

  const link = result[0];
  
  await db.update(links)
    .set({ 
      clicks: link.clicks + 1, 
      lastClicked: new Date() 
    })
    .where(eq(links.code, code));

  return Response.redirect(link.url, 302);
}

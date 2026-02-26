import { NextResponse, type NextRequest } from "next/server";
import { db } from "~/server/db";
import { requestLoopsTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const body = await req.json();

  await db.insert(requestLoopsTable).values({ id: body.id }).run();

  while (await db.select().from(requestLoopsTable).where(eq(requestLoopsTable.id, body.id)).get()) { 
    fetch(body.destinationUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        url: "https://colba-hackathon-2026-tester.vercel.app/api",
        body: body.payload,
        queueId: "6ba4d784-c66a-4c58-bab7-f5ba1d312b52",
        method: "POST",
      }),
    });
  }

  return NextResponse.json({ message: "process ended" });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  await db.delete(requestLoopsTable).where(eq(requestLoopsTable.id, body.id)).run();
  return NextResponse.json({ message: "stopped sending request." });
}
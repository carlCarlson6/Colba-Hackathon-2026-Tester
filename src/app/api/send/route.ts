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
      body: JSON.stringify({ payload: body.payload }),
    });
  }

  return NextResponse.json({ message: "process ended" });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  await db.delete(requestLoopsTable).where(eq(requestLoopsTable.id, body.id)).run();
  return NextResponse.json({ message: "stopped sending request." });
}
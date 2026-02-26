import { randomInt } from "crypto";
import { desc } from "drizzle-orm";
import { db } from "~/server/db";
import { recievedRequestsTable } from "~/server/db/schema";

export async function POST(req: Request) {
  const body = await req.text();

  if (randomInt(0, 5) === 0) { 
    await new Promise((resolve) => setTimeout(resolve, randomInt(1000, 15000)));
  }
  

  await db.insert(recievedRequestsTable).values({
    requestText: body,
  }).run();

  return new Response("received!", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GET() {
  const requests = await db
    .select()
    .from(recievedRequestsTable)
    .orderBy(desc(recievedRequestsTable.createdAt))
    .all();

  return Response.json(requests);
}

export async function DELETE() {
  await db.delete(recievedRequestsTable).run();

  return new Response("deleted!", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
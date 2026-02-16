import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const todo = await db
    .select()
    .from(todos)
    .where(eq(todos.id, Number(id)));

  return NextResponse.json(todo[0]);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  await db
    .update(todos)
    .set({
      title: body.title,
      description: body.description,
      completed: body.completed,
    })
    .where(eq(todos.id, Number(id)));

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await db.delete(todos).where(eq(todos.id, Number(id)));

  return NextResponse.json({ success: true });
}

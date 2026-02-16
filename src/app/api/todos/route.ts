import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET: 一覧取得
export async function GET() {
  const all = await db.select().from(todos);
  const serialized = all.map((todo: typeof todos.$inferSelect) => ({
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  }));
  return NextResponse.json(serialized);
}

// POST: 新規追加
export async function POST(req: Request) {
  const body = await req.json();

  const result = await db.insert(todos).values({
    title: body.title,
    description: body.description,
  });

  const rawResult = result as unknown as Array<{
    insertId?: bigint | number | string;
  }>;
  const insertId = Number(rawResult[0]?.insertId);

  if (!insertId) {
    return NextResponse.json({ error: "Failed to insert" }, { status: 500 });
  }

  const newTodo = await db.select().from(todos).where(eq(todos.id, insertId));

  if (!newTodo[0]) {
    return NextResponse.json({ error: "Todo not found" }, { status: 500 });
  }

  const serialized = {
    ...newTodo[0],
    createdAt: newTodo[0].createdAt.toISOString(),
    updatedAt: newTodo[0].updatedAt.toISOString(),
  };

  return NextResponse.json(serialized);
}

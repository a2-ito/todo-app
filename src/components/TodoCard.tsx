"use client";

import { useState } from "react";

type Props = {
  todo: any;
  onUpdate: (todo: any) => void;
  onDelete: (id: number) => void;
};

export default function TodoCard({ todo, onUpdate, onDelete }: Props) {
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
    });
    onUpdate({ ...todo, completed: !todo.completed });
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition">
      <div>
        <h2
          className={`text-lg font-semibold ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.title}
        </h2>
        {todo.description && (
          <p className="text-sm text-gray-500">{todo.description}</p>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={toggle}
          disabled={loading}
          className={`px-3 py-1 rounded-lg text-sm ${
            todo.completed
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {todo.completed ? "戻す" : "完了"}
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 rounded-lg text-sm bg-red-100 text-red-700"
        >
          削除
        </button>
      </div>
    </div>
  );
}

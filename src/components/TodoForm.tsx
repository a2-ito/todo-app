"use client";

import { useState } from "react";

export default function TodoForm({ onAdd }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {
    if (!title) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    });

    const data = await res.json();
    onAdd(data);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded mb-2"
        placeholder="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        追加
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const submit = async () => {
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    });
    router.push("/");
  };

  return (
    <div>
      <h1>New Todo</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={submit}>追加</button>
    </div>
  );
}

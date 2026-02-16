"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoDetail({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/todos/${params.id}`)
      .then((res) => res.json())
      .then(setTodo);
  }, [params.id]);

  const update = async () => {
    await fetch(`/api/todos/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });
    router.push("/");
  };

  const remove = async () => {
    await fetch(`/api/todos/${params.id}`, {
      method: "DELETE",
    });
    router.push("/");
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div>
      <input
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <textarea
        value={todo.description ?? ""}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <label>
        完了
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        />
      </label>

      <button onClick={update}>更新</button>
      <button onClick={remove}>削除</button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import TodoCard from "@/components/TodoCard";
import TodoForm from "@/components/TodoForm";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const handleDelete = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdate = (updated: any) => {
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleAdd = (todo: any) => {
    setTodos((prev) => [todo, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl text-gray-400 font-bold mb-6 text-center">
        Todo App
      </h1>

      <TodoForm onAdd={handleAdd} />
      <FilterBar filter={filter} setFilter={setFilter} />

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 mt-10">Todo がありません</div>
      )}

      <div className="space-y-4">
        {filtered.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}

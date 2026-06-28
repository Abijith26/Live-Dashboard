"use client";

import Board from "@/components/Board/Board";
import DndBoard from "@/components/Board/DndBoard";
import { useBoard } from "@/hooks/useBoard";
import { useSocket } from "@/hooks/useSocket";

export default function Home() {
  useSocket();
  const { data, isLoading, error } = useBoard();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading board...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        Failed to load board.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">

        <header className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-black">
              🚀 Live Dashboard
            </h1>

            <p className="text-slate-500">
              Manage your work efficiently
            </p>
          </div>

        </header>

        <DndBoard board={data} />

      </div>
    </main>
  );
}
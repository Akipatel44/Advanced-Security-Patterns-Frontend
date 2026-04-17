"use client";

import React, { useEffect, useState } from "react";

type Toast = { id: number; message: string; type?: "error" | "success" | "info" };

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (ev: Event) => {
      const e = ev as CustomEvent;
      const { message, type } = e.detail || {};
      if (!message) return;
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((s) => [...s, { id, message, type }]);
      // Auto-remove after 4.5s
      setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), 4500);
    };

    window.addEventListener("app:toast", handler as EventListener);
    return () => window.removeEventListener("app:toast", handler as EventListener);
  }, []);

  const remove = (id: number) => setToasts((s) => s.filter((t) => t.id !== id));

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto max-w-xs w-full px-4 py-2 rounded-md shadow-md text-sm flex items-start justify-between gap-3 ${
            t.type === "error" ? "bg-red-600 text-white" : t.type === "success" ? "bg-green-600 text-white" : "bg-gray-800 text-white"
          }`}
        >
          <div className="flex-1">{t.message}</div>
          <button aria-label="close" onClick={() => remove(t.id)} className="ml-2 font-bold">×</button>
        </div>
      ))}
    </div>
  );
}

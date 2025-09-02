import React, { useState, useEffect, lazy, Suspense } from "react";

/*
 FloatingAssistant:
 - fixed at bottom-right
 - lazy-loads AIChat and shows fallback if missing
 - accessible (aria-label) and closable with Escape
*/

const AIChat = lazy(() =>
  import("./AIChat").then((mod) => {
    if (mod && mod.default) return { default: mod.default };
    if (mod && mod.AIChat) return { default: mod.AIChat };
    // fallback UI component if AIChat missing
    const Fallback = () => (
      <div className="p-4">
        <div className="font-semibold">Assistant unavailable</div>
        <div className="text-sm text-slate-600 mt-2">
          The <code>AIChat</code> component couldn't be loaded. Ensure <code>src/components/AIChat.jsx</code> exports a default component.
        </div>
      </div>
    );
    return { default: Fallback };
  })
);

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      {/* FAB */}
      <button
        aria-label={open ? "Close assistant" : "Open assistant"}
        onClick={() => setOpen(v => !v)}
        className="relative w-14 h-14 rounded-full shadow-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center hover:scale-105 transform transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.07 0-2.088-.166-3.003-.477L3 20l1.477-4.018C3.651 14.825 3 13.47 3 12 3 7.582 7.03 4 12 4s9 3.582 9 8z" />
        </svg>

        {!open && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium leading-none text-white bg-rose-500 rounded-full">
            •
          </span>
        )}
      </button>

      {/* Panel */}
      <div className={`mt-3 transition-transform transition-opacity duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"}`}>
        <div className="w-[360px] md:w-[420px] h-[620px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">SR</div>
              <div>
                <div className="text-sm font-semibold">Sunil's Assistant</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Answers from portfolio</div>
              </div>
            </div>
            <div>
              <button onClick={() => setOpen(false)} aria-label="Close panel" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 p-3">
            <Suspense fallback={<div className="h-full flex items-center justify-center text-sm text-slate-500">Loading assistant...</div>}>
              <AIChat />
            </Suspense>
          </div>

          <div className="px-3 py-2 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div>Tip: Try "Tell me about Sunil's projects"</div>
              <div className="flex gap-2">
                <button onClick={() => navigator.clipboard?.writeText("Tell me about Sunil's projects")} className="px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-gray-700">Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

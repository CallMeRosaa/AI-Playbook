"use client";

import { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import GuideModal from "./GuideModal";

// Global app chrome: the help (?) button that lives over every page's hero, plus
// the Guide modal it opens. Home's "What is this?" link opens the same modal by
// dispatching `ap:open-guide` — consistent with the app's custom-event idiom.
export default function AppChrome() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setOpen(true);
    window.addEventListener("ap:open-guide", openModal);
    return () => window.removeEventListener("ap:open-guide", openModal);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="How to use this app"
        className="absolute right-3 top-9 z-40 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/15 backdrop-blur-sm transition-colors"
      >
        <HelpCircle size={20} strokeWidth={2} />
      </button>
      <GuideModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

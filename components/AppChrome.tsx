"use client";

import { useEffect, useState } from "react";
import GuideModal from "./GuideModal";

// Global app chrome: hosts the Guide modal and keeps its open pathway wired. The
// floating "?" trigger was removed; the modal now opens only via the
// `ap:open-guide` custom event (e.g. Home's "What is this?" link), so the pathway
// stays intact and can be re-exposed later without re-plumbing.
export default function AppChrome() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setOpen(true);
    window.addEventListener("ap:open-guide", openModal);
    return () => window.removeEventListener("ap:open-guide", openModal);
  }, []);

  return <GuideModal open={open} onClose={() => setOpen(false)} />;
}

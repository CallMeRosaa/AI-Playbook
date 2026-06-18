"use client";

import { ExternalLink, Bot, BookOpen, FileText } from "lucide-react";
import { SURFACES, type Surface } from "@/lib/links";

// "Where to run this" routing block for a play card.
// Primary: GenAI.mil Agent. Secondary: Notebook. Reference: PDF.
// Pending surfaces render disabled with a "coming soon" note — honesty over dead links.

function SurfaceButton({
  surface,
  icon: Icon,
  variant,
}: {
  surface: Surface;
  icon: typeof Bot;
  variant: "primary" | "secondary" | "reference";
}) {
  const base =
    "w-full flex items-center gap-2 rounded-inner text-sm font-bold transition-all duration-base ease-smooth";
  const sizing = variant === "reference" ? "py-2 px-3 text-xs" : "py-2.5 px-3";

  const styles: Record<typeof variant, string> = {
    primary: "bg-primary text-white active:bg-primary-dark",
    secondary: "bg-white border border-primary text-primary active:bg-primary/5",
    reference: "bg-white border border-silver-mid text-gray-600 active:bg-gray-50",
  };

  if (surface.status === "pending" || !surface.url) {
    return (
      <div
        className={`${base} ${sizing} bg-gray-100 text-gray-400 cursor-not-allowed justify-between`}
        aria-disabled="true"
      >
        <span className="flex items-center gap-2">
          <Icon size={15} className="flex-shrink-0" />
          {surface.label}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide bg-gray-200 text-gray-500 px-2 py-0.5 rounded-badge">
          Coming soon
        </span>
      </div>
    );
  }

  return (
    <a
      href={surface.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizing} ${styles[variant]} justify-between`}
    >
      <span className="flex items-center gap-2">
        <Icon size={15} className="flex-shrink-0" />
        {surface.label}
      </span>
      <ExternalLink size={14} className="flex-shrink-0 opacity-80" />
    </a>
  );
}

export default function SurfaceRouting() {
  return (
    <div className="mt-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-silver mb-2">Where to run this</p>
      <div className="flex flex-col gap-2">
        <SurfaceButton surface={SURFACES.agent} icon={Bot} variant="primary" />
        <SurfaceButton surface={SURFACES.notebook} icon={BookOpen} variant="secondary" />
        <SurfaceButton surface={SURFACES.pdf} icon={FileText} variant="reference" />
      </div>
    </div>
  );
}

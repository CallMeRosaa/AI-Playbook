import Link from "next/link";
import { BookOpen, Wrench, User, Clock, Zap, Shield } from "lucide-react";
import { PROMPTS } from "@/lib/mock/prompts";
import { TOOLS } from "@/lib/mock/tools";

const features = [
  {
    href: "/prompts",
    icon: BookOpen,
    title: "Prompt Library",
    description: "Ready-to-use AI prompts for EPRs, emails, briefs, and more — tailored for Airmen.",
    stat: `${PROMPTS.length} prompts`,
    color: "bg-[#003087]",
    accent: "text-[#FFC72C]",
    light: false,
  },
  {
    href: "/tools",
    icon: Wrench,
    title: "AI Tool Catalog",
    description: "Every AI tool approved for AF use — what it does, where to access, and when to use it.",
    stat: `${TOOLS.length} tools`,
    color: "bg-[#002554]",
    accent: "text-[#FFC72C]",
    light: false,
  },
  {
    href: "/persona",
    icon: User,
    title: "Airman Persona Builder",
    description: "Build your personal AI context file. Paste it into any AI tool and instantly get better outputs.",
    stat: "2 min setup",
    color: "bg-[#FFC72C]",
    accent: "text-[#003087]",
    light: true,
  },
];

const stats = [
  { icon: Clock, label: "Avg. hrs saved/week", value: "4–6 hrs" },
  { icon: Zap, label: "Prompts ready to use", value: `${PROMPTS.length}` },
  { icon: Shield, label: "NIPR-approved tools", value: `${TOOLS.filter(t => t.accessLevel !== "Commercial").length}` },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-[#003087] text-white px-5 pt-10 pb-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={14} className="text-[#FFC72C]" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#FFC72C]">
            PFTU 26-3 · AI Workforce Efficiencies
          </span>
        </div>
        <h1
          className="text-3xl font-black uppercase tracking-tight leading-tight mb-2"
          style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
        >
          Airman&apos;s<br />AI Playbook
        </h1>
        <p className="text-sm text-blue-200 font-medium">
          Reclaim your time. Expand your mission capacity.
        </p>
      </div>

      {/* Stats bar */}
      <div className="bg-[#002554] text-white px-4 py-3 flex justify-around">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <Icon size={13} className="text-[#FFC72C] mb-0.5" />
            <span className="text-base font-bold leading-tight">{value}</span>
            <span className="text-[9px] text-blue-300 leading-tight max-w-[72px] mt-0.5">{label}</span>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="px-4 pt-5 flex flex-col gap-3">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider px-1">
          Choose where to start
        </p>

        {features.map(({ href, icon: Icon, title, description, stat, color, accent, light }) => (
          <Link key={href} href={href}>
            <div className={`${color} rounded-2xl p-5 shadow-sm active:scale-[0.98] transition-transform`}>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-xl bg-white/15">
                  <Icon size={20} className={accent} />
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 ${accent}`}>
                  {stat}
                </span>
              </div>
              <h2
                className={`text-lg font-black uppercase tracking-tight ${light ? "text-[#003087]" : "text-white"}`}
                style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
              >
                {title}
              </h2>
              <p className={`text-sm mt-1 leading-snug ${light ? "text-[#002554]/80" : "text-blue-100"}`}>
                {description}
              </p>
            </div>
          </Link>
        ))}

        {/* Mission statement */}
        <div className="mt-1 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-[11px] text-gray-500 leading-relaxed text-center">
            <span className="font-bold text-[#003087]">This is not about manpower reduction.</span>{" "}
            It&apos;s about returning capacity to the mission — so you can focus on what matters most.
          </p>
        </div>
      </div>
    </div>
  );
}

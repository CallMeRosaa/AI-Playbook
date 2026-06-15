"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Wrench, User } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/prompts", label: "Prompts", icon: BookOpen },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/persona", label: "My Persona", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 bottom-nav-safe">
      <div className="flex max-w-lg mx-auto">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium transition-colors ${
                active ? "text-[#003087]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? "text-[#003087]" : ""}
              />
              <span className={active ? "font-semibold" : ""}>{label}</span>
              {active && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#FFC72C] rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

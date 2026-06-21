"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, GraduationCap, Layers, Wrench, LayoutDashboard } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/plays", label: "Plays", icon: Layers },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/ai-101", label: "AI 101", icon: GraduationCap },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 nav-glass bottom-nav-safe ${scrolled ? "scrolled" : ""}`}>
      <div className="flex max-w-lg mx-auto">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs font-medium
                transition-colors duration-150
                ${active ? "text-primary" : "text-silver hover:text-gray-600 active:text-gray-700"}
              `}
            >
              <span className={`
                flex items-center justify-center w-8 h-7 rounded-full transition-all duration-200
                ${active ? "bg-primary/10" : "bg-transparent hover:bg-silver-tint"}
              `}>
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 1.8}
                />
              </span>
              <span className={`leading-none tracking-tight ${active ? "font-bold text-primary" : ""}`}>
                {label}
              </span>
              <span className={`
                h-0.5 rounded-t-full bg-primary transition-all duration-250
                ${active ? "w-6 opacity-100" : "w-0 opacity-0"}
              `} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

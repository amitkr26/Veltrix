"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Compass, Plus, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/discover", icon: Compass },
  { name: "Create", href: "/create", icon: Plus },
  { name: "Identity", href: "/profile", icon: User },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-fit md:top-8 md:bottom-auto">
      <div className="chrome-blur border border-white/5 rounded-full px-2 py-2 flex items-center gap-1.5 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex items-center justify-center gap-3 px-6 py-3 rounded-full transition-all duration-300 tactile-press group",
                isActive 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary rounded-full shadow-lg"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <Icon className={cn(
                "w-[20px] h-[20px] relative z-10 transition-all duration-300",
                isActive ? "scale-100" : "scale-95 group-hover:scale-100"
              )} />
              <span className={cn(
                "text-[11px] font-bold uppercase tracking-[0.1em] relative z-10 transition-all duration-300",
                isActive ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0 overflow-hidden"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

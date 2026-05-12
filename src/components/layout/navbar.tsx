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
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-lg md:top-8 md:bottom-auto">
      <div className="glass border border-white/10 rounded-[2rem] px-2 py-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl transition-all duration-300 tap-active",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={cn("w-5 h-5 relative z-10", isActive && "fill-current")} />
                <span className="text-[9px] font-black uppercase tracking-widest relative z-10 hidden sm:block">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

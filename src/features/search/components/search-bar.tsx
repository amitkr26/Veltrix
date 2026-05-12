"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
      </div>
      <Input
        placeholder="Search for creators, videos, or prompts..."
        className="h-16 pl-14 pr-32 bg-white/5 border-white/10 rounded-2xl text-lg font-medium focus:bg-white/10 transition-all shadow-2xl"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute inset-y-0 right-3 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/10">
            <SlidersHorizontal className="w-5 h-5" />
        </Button>
        <Button size="sm" className="rounded-xl font-bold px-4">
            Search
        </Button>
      </div>
    </div>
  );
}

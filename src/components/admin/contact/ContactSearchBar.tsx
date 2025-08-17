"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  placeholder?: string;
};

export default function ContactSearchBar({ value, onChange, onSearch, placeholder }: Props) {
  return (
    <div className="flex gap-2 w-full max-w-md">
      <Input
        placeholder={placeholder || "Search by name or email..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
}

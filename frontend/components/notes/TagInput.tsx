"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  error?: string;
}

export function TagInput({
  value,
  onChange,
  maxTags = 10,
  error,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const commitTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (value.includes(tag)) {
      setInputValue("");
      return;
    }
    if (value.length >= maxTags) return;
    onChange([...value, tag]);
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div>
      <div
        className={`flex flex-wrap items-center gap-1.5 border rounded px-2 py-1.5 focus-within:ring-2 focus-within:ring-accent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-note-sage text-sm px-2 py-0.5 rounded-full"
            style={{ color: "var(--color-note-sage-text)" }}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove tag ${tag}`}
              className="hover:opacity-70"
            >
              <X size={12} className="cursor-pointer"/>
            </button>
          </span>
        ))}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => commitTag(inputValue)}
          placeholder={value.length === 0 ? "Add a tag and press Enter" : ""}
          disabled={value.length >= maxTags}
          className="flex-1 min-w-25 outline-none py-0.5 text-sm bg-transparent"
        />
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {value.length >= maxTags && (
        <p className="text-xs text-muted-foreground mt-1">
          Max {maxTags} tags reached
        </p>
      )}
    </div>
  );
}

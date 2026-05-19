"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { isValidEmail } from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { EmailChipsInputProps } from "@/types/components/wizard";

export function EmailChipsInput({
  emails,
  onChange,
  error,
}: EmailChipsInputProps) {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const addEmail = (raw: string) => {
    const email = raw.trim().toLowerCase();
    if (!email) return;

    if (!isValidEmail(email)) {
      setInputError("Please enter a valid email address");
      return;
    }
    if (emails.includes(email)) {
      setInputError("This email is already added");
      return;
    }

    onChange([...emails, email]);
    setInput("");
    setInputError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail(input);
    }
    if (e.key === "Backspace" && !input && emails.length > 0) {
      onChange(emails.slice(0, -1));
    }
  };

  const removeEmail = (email: string) => {
    onChange(emails.filter((e) => e !== email));
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex min-h-10 flex-wrap gap-2 rounded-md border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring",
          (error || inputError) && "border-destructive",
        )}
      >
        {emails.map((email) => (
          <Badge key={email} variant="secondary" className="gap-1 pr-1">
            {email}
            <button
              type="button"
              onClick={() => removeEmail(email)}
              className="rounded-full p-0.5 hover:bg-muted"
              aria-label={`Remove ${email}`}
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setInputError(null);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addEmail(input)}
          placeholder={
            emails.length ? "Add another email" : "Type email and press Enter"
          }
          className="min-w-[180px] flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
        />
      </div>
      {(inputError || error) && (
        <p className="text-sm text-destructive">{inputError ?? error}</p>
      )}
      <p className="text-xs text-muted-foreground">
        Press Enter or comma to add each recipient
      </p>
    </div>
  );
}

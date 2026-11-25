"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

/** Copies text to the clipboard and says "Copied!" for 2 seconds. */
export function CopyButton({
  text,
  label,
  copiedLabel,
}: {
  text: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (old browser / not https): select-and-copy fallback.
      window.prompt(label, text);
    }
  }

  return (
    <Button type="button" variant="secondary" onClick={copy}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </Button>
  );
}

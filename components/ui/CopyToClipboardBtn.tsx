"use client";

import React from "react";

import { clsx } from "clsx";
import { toast } from "sonner";

interface CopyToClipboardBtnProps {
  text: string;
}

export default function CopyToClipboardBtn({
  text,
}: CopyToClipboardBtnProps): React.ReactNode {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard", {
        duration: 2000,
        position: "top-center",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <span className="inline" onClick={() => copyToClipboard(text)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 text-gray-400 hover:text-gray-800 transition-colors"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 16.5H6.75A2.25 2.25 0 0 1 4.5 14.25V6.75A2.25 2.25 0 0 1 6.75 4.5h7.5A2.25 2.25 0 0 1 16.5 6.75V8M8.25 9.75h7.5a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 6 19.5v-7.5a2.25 2.25 0 0 1 2.25-2.25Z"
        />
      </svg>
    </span>
  );
}

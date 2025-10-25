"use client";

import React from "react";

export default function LoadingOverlay({
  loadingLabel,
}: {
  loadingLabel?: string;
}): React.ReactNode {
  return (
    <div className="absolute inset-0 backdrop-blur-sm opacity-50 flex items-center justify-center z-10 rounded-lg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-700 font-medium">
          {loadingLabel ?? "Submitting..."}
        </p>
      </div>
    </div>
  );
}

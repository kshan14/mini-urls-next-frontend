"use client";

import React from "react";

interface MiniUrlCreationSuccessMessageProps {
  shortenedUrl: string;
}

export default function MiniUrlCreationSuccessMessage({
  shortenedUrl,
}: MiniUrlCreationSuccessMessageProps): React.ReactNode {
  return (
    <div className="w-full rounded-lg border border-green-400 overflow-hidden mt-1">
      <table className="w-full overflow-hidden text-green-600 bg-green-100">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-1">
              <div className="flex justify-center">
                <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </td>
            <td className="p-1 pl-0">
              <p className="text-md text-green-700 font-semibold">
                Mini Url created successfully!
              </p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="p-1 pl-0">
              <p className="text-sm">Your new shortened URL is:</p>
              <p className="text-md font-semibold break-all">{shortenedUrl}</p>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="p-1 pl-0">
              <p className="text-sm">
                This URL is now awaiting admin approval before it can be used.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

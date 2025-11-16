"use client";

import Link from "next/link";

import { useNotificationHooks } from "@/components/hooks/notificationHooks";

interface HeaderBarNotificationProps {
  wsUrl: string;
  jwtToken: string;
}

export default function HeaderBarNotification({
  wsUrl,
  jwtToken,
}: HeaderBarNotificationProps): React.ReactNode {
  const {
    notiData,
    showDropdown,
    hasReadAll,

    // action
    onNotiBtnClick,
  } = useNotificationHooks(wsUrl, jwtToken);

  return (
    <div className="relative inline">
      <button
        className="relative p-2 rounded-full hover:text-blue-600 transition"
        onClick={onNotiBtnClick}
      >
        {/* Bell Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V10a6 6 0 10-12 0v4c0 .386-.146.758-.405 1.054L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {/* New Noti Alert Icon */}
        {!hasReadAll && (
          <span className="absolute top-1 right-1">
            <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        )}
        {/* Noti Dropdowns */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-100">
            <ul className="max-h-120 overflow-y-auto">
              {notiData.map((n) => (
                <li
                  key={n.id}
                  className="px-4 py-2 hover:text-blue-500 font-bold cursor-pointer text-sm"
                >
                  <Link href={n.redirectUrl}>{n.message}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </button>
    </div>
  );
}

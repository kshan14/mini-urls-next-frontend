import React from "react";
import Link from "next/link";

import HeaderBarNotification from "@/components/ui/HeaderBarNotification";
import HeaderBarLogoutBtn from "@/components/ui/HeaderBarLogoutBtn";

interface HeaderBarProps {
  isAdmin: boolean;
  isLoggedIn: boolean;
  jwtToken?: string;
  wsUrl: string;
}

const userLinks = [
  {
    link: "/create-urls",
    label: "Create New",
  },
  {
    link: "/urls",
    label: "My Urls",
  },
];

const adminLinks = [
  {
    link: "/create-urls",
    label: "Create New",
  },
  {
    link: "/urls",
    label: "Review Urls",
  },
];

const HeaderBar = ({
  isAdmin,
  jwtToken,
  wsUrl,
}: HeaderBarProps): React.ReactNode => {
  // copy base line links
  let links = [...userLinks];
  // if admin , change to admin links
  if (isAdmin) {
    links = [...adminLinks];
  }
  const renderedLinks = links.map((l) => (
    <div className="flex-1 text-center whitespace-nowrap md:p-2" key={l.label}>
      <Link className="hover:text-blue-500 font-bold" href={l.link}>
        {l.label}
      </Link>
    </div>
  ));

  return (
    <header className="shadow-sm border-b border-gray-300">
      <div className="sm:w-full md:w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* left side header content */}
          <div className="flex items-center justify-between">
            <div className="h-8 w-8 rounded-md flex items-center justify-center">
              <svg
                className="text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">
              TinyURL
            </span>
          </div>
          {/* right side header content */}
          <div className="flex items-center sm:space-x-0 md:space-x-2">
            {renderedLinks}
            {jwtToken ? (
              <>
                <HeaderBarNotification jwtToken={jwtToken} wsUrl={wsUrl} />
                <HeaderBarLogoutBtn />
              </>
            ) : (
              <Link
                href={"/login"}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-sm flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;

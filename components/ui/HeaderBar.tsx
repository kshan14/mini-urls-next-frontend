import React from "react";
import Link from "next/link";

import HeaderBarLogoutBtn from "./HeaderBarLogoutBtn";

interface HeaderBarProps {
  isAdmin: boolean;
  isLoggedIn: boolean;
}

const userLinks = [
  {
    link: "/create-urls",
    label: "Create New",
  },
  {
    link: "/my-urls",
    label: "My Urls",
  },
];

const adminAdditionalLink = [
  {
    link: "/review-urls",
    label: "Review Urls",
  },
];

const HeaderBar = ({
  isAdmin,
  isLoggedIn,
}: HeaderBarProps): React.ReactNode => {
  // copy base line links
  let links = [...userLinks];
  // if admin , add additional link
  if (isAdmin) {
    links = [...userLinks, ...adminAdditionalLink];
  }
  const renderedLinks = links.map((l) => (
    <Link key={l.label} className="hover:text-blue-500 font-bold" href={l.link}>
      {l.label}
    </Link>
  ));

  return (
    <header className="shadow-sm border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* left side header content */}
          <div className="flex items-center">
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
          <div className="flex items-center space-x-4 sm:w-8/12 lg:w-5/12">
            {renderedLinks}
            <HeaderBarLogoutBtn />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;

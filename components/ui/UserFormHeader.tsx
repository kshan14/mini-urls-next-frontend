import React from "react";

interface UserFormHeaderProps {
  headerLabel: string;
  subHeaderLabel: string;
}

const UserFormHeader = ({
  headerLabel,
  subHeaderLabel,
}: UserFormHeaderProps): React.ReactNode => {
  return (
    <div className="text-center mb-1 p-10">
      <div className="flex items-center justify-center mb-3">
        <svg
          className="w-10 h-10 text-blue-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
        </svg>
        <h1 className="text-4xl font-bold">Mini URL</h1>
      </div>
      <h2 className="text-2xl font-bold">{headerLabel}</h2>
      <p className="mt-1 opacity-80">{subHeaderLabel}</p>
    </div>
  );
};

export default UserFormHeader;

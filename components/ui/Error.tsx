"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  isGenericError: boolean;
  errorCodeMsg: string;
  refreshBtnCb?: () => void;
}

const DashboardSvg = () => (
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
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const RefreshPageSvg = () => (
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
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
  </svg>
);

const ErrorPage = ({
  isGenericError,
  errorCodeMsg,
  refreshBtnCb,
}: ErrorProps): React.ReactNode => {
  const router = useRouter();

  const redirectHome = () => {
    router.push("/");
  };

  return (
    <div className="md:w-full lg:w-5xl flex flex-col items-center justify-center">
      {isGenericError && (
        <>
          <h2 className="text-3xl font-bold p-3">Something went wrong!</h2>
          <div className="p-2">
            <span className="text-gray-500">
              We encountered an unexpected issue while managing your URL. Don't
              worry, your data is safe. Please try refreshing the page
            </span>
          </div>
        </>
      )}
      <div className="p-3 border border-blue-200 bg-blue-200 rounded-xl">
        <span className="text-blue-500 font-bold">{errorCodeMsg}</span>
      </div>
      <div className="flex flex-row lg:w-2/3 lg:space-x-15 p-3 mt-2">
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 font-bold rounded-lg flex items-center justify-center gap-1"
          onClick={redirectHome}
        >
          <DashboardSvg />
          Return to Dashboard
        </button>
        {refreshBtnCb && (
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 font-bold rounded-lg flex items-center justify-center gap-1"
            onClick={refreshBtnCb}
          >
            <RefreshPageSvg />
            Refresh Page
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;

"use client";

import ErrorPage from "@/components/ui/Error";

export default function NotFound() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ErrorPage
        isGenericError={false}
        errorCodeMsg="Error Code: 404-NOT FOUND"
      />
    </div>
  );
}

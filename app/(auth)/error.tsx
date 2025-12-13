"use client";

import ErrorPage from "@/components/ui/Error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      isGenericError={true}
      refreshBtnCb={reset}
      errorCodeMsg="Error Code: 500-INTERNAL"
    />
  );
}

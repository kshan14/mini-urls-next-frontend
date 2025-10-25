import React from "react";

interface UnAuthLayoutProps {
  children: React.ReactNode;
}

export default function UnAuthLayout({
  children,
}: UnAuthLayoutProps): React.ReactNode {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

import React from "react";
import Link from "next/link";

interface UserFormRedirectFooterProps {
  label: string;
  linkHref: string;
  linkLabel: string;
}

const UserFormRedirectFooter = ({
  label,
  linkHref,
  linkLabel,
}: UserFormRedirectFooterProps): React.ReactNode => {
  return (
    <div className="text-center p-3 w-full">
      <p>
        <span className="opacity-80">{label}</span>
        <Link className="pl-1 text-blue-500 font-bold" href={linkHref}>
          {linkLabel}
        </Link>
      </p>
    </div>
  );
};

export default UserFormRedirectFooter;

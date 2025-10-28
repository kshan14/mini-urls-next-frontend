"use server";

import clsx from "clsx";

import Link from "next/link";

interface UrlTableFilterProps {
  baseUrl: string;
  activeFilter: string;
  availableFilters: string[];
}

export default async function UrlTableFilter({
  baseUrl,
  activeFilter,
  availableFilters,
}: UrlTableFilterProps) {
  return (
    <>
      {availableFilters.map((f) => (
        <Link
          key={f}
          href={`${baseUrl}?status=${f}`}
          className={clsx(
            "rounded-md py-0.5 px-2.5 border text-sm  transition-all shadow-sm mx-1",
            activeFilter === f
              ? "bg-slate-800 text-white border-transparent"
              : "border-slate-300 text-slate-800"
          )}
        >
          {f}
        </Link>
      ))}
    </>
  );
}

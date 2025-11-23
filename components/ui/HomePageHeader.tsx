import clsx from "clsx";
import React from "react";

interface HomePageHeadingProps {
  isMainBrand: boolean;
  title: string;
  description: string;
}

export default function HomePageHeading({
  isMainBrand,
  title,
  description,
}: HomePageHeadingProps): React.ReactNode {
  return (
    <div className="w-full h-full flex-col flex items-center justify-center p-3">
      <h1
        className={clsx(
          "mb-3 tracking-tight",
          isMainBrand && "text-4xl md:text-5xl lg:text-6xl",
          !isMainBrand && "text-2xl md:text-3xl lg:text-4xl"
        )}
      >
        {title}
      </h1>
      <p className="text-lg font-normal sm:px-16 md:text-xl lg:text-2xl">
        {description}
      </p>
    </div>
  );
}

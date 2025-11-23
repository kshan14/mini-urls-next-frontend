import React from "react";

const linkSvgPath = (
  <>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </>
);

const analyticsSvgPath = (
  <>
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </>
);

const gearSvgPath = (
  <>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </>
);

interface BrandData {
  svg: React.ReactNode;
  brandText: string;
  brandDescription: string;
}

const brands: BrandData[] = [
  {
    svg: linkSvgPath,
    brandText: "Custom Branded Links",
    brandDescription:
      "Create personalized, memorable links that build brand recognition and trust.",
  },
  {
    svg: analyticsSvgPath,
    brandText: "In-Depth Analytics",
    brandDescription:
      "Track every click with detailed reports on location, referrers, and more.",
  },
  {
    svg: gearSvgPath,
    brandText: "Easy Management",
    brandDescription:
      "A simple, intuitive dashboard to manage all your links in one place",
  },
];

export default function HomePageBrands(): React.ReactNode {
  return (
    <div className="flex justify-around">
      {brands.map((b) => (
        <div
          key={b.brandText}
          className="max-w-md mx-auto rounded-2xl shadow p-6 bg-white flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-blue-600"
            >
              {b.svg}
            </svg>
          </div>

          <h2 className="text-xl font-semibold mb-2">{b.brandText}</h2>
          <p className="text-gray-600">{b.brandDescription}</p>
        </div>
      ))}
    </div>
  );
}

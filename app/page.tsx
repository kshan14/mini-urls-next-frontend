import { cookies } from "next/headers";
import Link from "next/link";

import HeaderBar from "@/components/ui/HeaderBar";
import HomePageHeading from "@/components/ui/HomePageHeader";
import HomePageBrands from "@/components/ui/HomePageBrands";

import { parseJWTToken } from "@/lib/jwt";
import env from "@/lib/env";

const { WS_BASE_URL } = env();

export default async function Home() {
  // 1. Get token and verify
  const cookieStore = await cookies();
  const resp = await parseJWTToken(cookieStore);

  // 2. Check loggedIn and role
  let isLoggedIn = resp.data ? true : false;
  let isAdmin = isLoggedIn && resp.data?.role === "Admin";
  let token = resp.data?.token;
  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll">
      <HeaderBar
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        jwtToken={token}
        wsUrl={WS_BASE_URL}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex-5">
          <HomePageHeading
            isMainBrand={true}
            title="Shorten, Share, and Track Your Links"
            description="Powerful, branded links and detailed analytics for your business"
          />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-white font-bold bg-green-600 rounded-sm sm:p-1 md:p-2 lg:p-3">
            <Link href={"/create-urls"}>Get Started for Free</Link>
          </span>
        </div>
        <div className="flex-3">
          <HomePageHeading
            isMainBrand={false}
            title="Key Features"
            description="Everything you need to create, share, and monitor your links with ease"
          />
        </div>
        <div className="flex-3">
          <HomePageBrands />
        </div>
      </div>
    </div>
  );
}

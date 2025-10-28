import { cookies } from "next/headers";

import UrlTableFilter from "@/components/ui/UrlTableFilter";
import UrlTable from "@/components/ui/UrlTable";

import { parseJWTToken } from "@/lib/jwt";
import { getMiniUrlPageAPI } from "@/lib/apis/miniurls";
import { optionalParseToInt } from "@/lib/utils";
import {
  PendingUrlStatus,
  ApprovedUrlStatus,
  RejectedUrlStatus,
} from "@/lib/apis/miniurls/types";

const statusFilters = [
  "All", // this is not a valid API Filter. This is used only for UI
  PendingUrlStatus,
  ApprovedUrlStatus,
  RejectedUrlStatus,
];

function parseToAPIStatusFilter(statusFilter?: string): string | undefined {
  // consider All as empty filter because backend api does not recognise this value
  if (
    !statusFilter ||
    statusFilter === "All" ||
    !statusFilters.includes(statusFilter)
  ) {
    return undefined;
  }
  return statusFilter;
}

export default async function Urls({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 1. get limit, offset and status from search params
  const params = await searchParams;
  const offsetStr = params.offset as string;
  const limitStr = params.limit as string;
  const statusStr = params.status as string;

  // 2. parse params
  const offset = optionalParseToInt(offsetStr, 0);
  const limit = optionalParseToInt(limitStr, 50);
  // 3. status should be default to All
  let statusParams: string | undefined = undefined;
  if (statusStr && statusFilters.includes(statusStr)) {
    statusParams = statusStr;
  }
  // 4. get jwt data
  const cookieStore = await cookies();
  const token = cookieStore.get("auth")?.value ?? "";
  const jwtResp = await parseJWTToken(cookieStore);

  // 5. invoke backend api
  const apiResp = await getMiniUrlPageAPI(
    token,
    offset,
    limit,
    parseToAPIStatusFilter(statusParams) // parse to api status filter as some filter values are used only in UI
  );
  if (apiResp.err) {
    throw new Error(apiResp.err);
  }
  return (
    <div className="sm:w-full md:w-10/12">
      <h1 className="font-bold text-4xl sm:mt-1 md:mt-6 sm:mb-2 md:mb-5">
        My Mini Urls
      </h1>
      <UrlTableFilter
        baseUrl="/urls"
        activeFilter={statusParams ?? "All"}
        availableFilters={statusFilters}
      />
      <UrlTable userRole={jwtResp.data?.role!} data={apiResp.data?.data!} />
    </div>
  );
}

export const dynamic = "force-dynamic";

import { cookies } from "next/headers";

import UrlTableFilter from "@/components/ui/UrlTableFilter";
import UrlTable from "@/components/ui/UrlTable";
import UrlTablePagination from "@/components/ui/UrlTablePagination";

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
    <div className="sm:w-full md:w-10/12 flex flex-col min-h-0">
      <h1 className="font-bold text-3xl md:pt-6 sm:pb-2 md:pb-5">
        My Mini Urls
      </h1>
      <div className="flex-1 min-h-0">
        <div className="h-full max-h-full flex flex-col min-h-0">
          {/* Table Filter takes the height as is */}
          <div>
            <UrlTableFilter
              baseUrl="/urls"
              activeFilter={statusParams ?? "All"}
              availableFilters={statusFilters}
            />
          </div>
          {/* Table takes the remaining height. It should also handle for overflow and should not cause the entire page component to stretch and scrollable */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="overflow-scroll">
              <UrlTable
                userRole={jwtResp.data?.role!}
                data={apiResp.data?.data!}
              />
            </div>
            {/* Table Pagination Footer takes the height as is */}
            <div>
              <UrlTablePagination
                limit={limit}
                offset={offset}
                totalCount={apiResp.data?.totalCount!}
                searchParams={params}
                baseUrl="/urls"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

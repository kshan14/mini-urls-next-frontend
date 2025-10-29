"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";

import ActionableCell from "@/components/ui/UrlTableActionableCell";
import CopyToClipboardBtn from "@/components/ui/CopyToClipboardBtn";

import {
  GetMiniUrlResponse,
  UrlStatus,
  PendingUrlStatus,
  ApprovedUrlStatus,
  RejectedUrlStatus,
} from "@/lib/apis/miniurls/types";
import { AdminRole, Role } from "@/lib/apis/commonTypes";
import {
  deleteMiniUrlAction,
  updateMiniUrlStatusAction,
} from "@/actions/miniurl";

const STATUS_COLORS = {
  [PendingUrlStatus]: "text-yellow-700",
  [ApprovedUrlStatus]: "text-green-700",
  [RejectedUrlStatus]: "text-red-700",
} as Record<UrlStatus, string>;

// renderStatusCell is responsible for showing record status with appropriate styling
const renderStatusCell = (
  data: OptimisticGetMiniUrlResponse
): React.ReactNode => {
  return (
    <td
      className={clsx(
        "text-left sm:p-1 md:p-2 font-bold min-w-40",
        STATUS_COLORS[data.status] || "text-red-700"
      )}
    >
      {/* give priority to update status */}
      {data.updatingStatus ?? data.status}
    </td>
  );
};

interface MiniUrlTableProps {
  data: GetMiniUrlResponse[];
  userRole: Role;
}

interface OptimisticGetMiniUrlResponse extends GetMiniUrlResponse {
  isUpdatePerforming?: boolean; // this is to mark the record as a target where action is being performed on
  updatingStatus?: "Approving..." | "Rejecting..." | "Deleting...";
}

export default function MiniUrlTable({
  data,
  userRole,
}: MiniUrlTableProps): React.ReactNode {
  // 1. Declare state rows from props data
  const [rows, setRows] = useState<OptimisticGetMiniUrlResponse[]>(data);
  // 2. Whenever an action is performed on row, this flag is used to disable all actions on rows until previous action is done
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // this is required as rows state is derived from data props, whenever parent changed, need to sync rows state again
  useEffect(() => {
    setRows(data);
  }, [data]);

  const updateRow = (
    id: string,
    updates: Partial<OptimisticGetMiniUrlResponse>
  ) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );

  const removeRow = (id: string) =>
    setRows((prev) => prev.filter((r) => r.id !== id));

  const onApproveOrDenyRecord = async (id: string, status: UrlStatus) => {
    setIsLoading(true);
    const currentRecord = rows.find((r) => r.id === id)!;
    // 1. Update the target record to particular status
    updateRow(id, {
      status,
      isUpdatePerforming: true,
      updatingStatus:
        status === ApprovedUrlStatus ? "Approving..." : "Rejecting...",
    });
    // 2. Invoke server action
    try {
      const errMsg = await updateMiniUrlStatusAction(id, status);
      // 3. Check server returns error. If error is there, throws it and catch block will handle the rest
      if (errMsg) {
        throw errMsg;
      }
      // 4. No issue in server action. Update the target record status and update flag
      updateRow(id, {
        status,
        isUpdatePerforming: false,
        updatingStatus: undefined,
      });
      // 5. Show feedback to user
      toast.success(
        `Mini Url ${currentRecord.shortenedUrl} has been ${status} successfully`
      );
    } catch (err) {
      // 6. Error is thrown, reset the target record status and flag back to the initial state
      updateRow(id, {
        status: currentRecord.status, // reset to previous status
        isUpdatePerforming: false,
        updatingStatus: undefined,
      });
      // 7. Show error feedback to user
      toast.error(
        `Failed to ${status} ${currentRecord.shortenedUrl}. Error: ${err}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteRecord = async (id: string) => {
    setIsLoading(true);
    const currentRecord = rows.find((r) => r.id === id)!;
    // 1. Update the target record to particular status
    updateRow(id, {
      isUpdatePerforming: true,
      updatingStatus: "Deleting...",
    });
    // 2. Invoke server action
    try {
      const errMsg = await deleteMiniUrlAction(id);
      // 3. Check server returns error. If error is there, throws it and catch block will handle the rest
      if (errMsg) {
        throw errMsg;
      }
      // 4. Show feedback to user
      toast.success(
        `Mini Url ${currentRecord.shortenedUrl} has been Deleted successfully`
      );
      // 5. Remove the deleted row from state
      removeRow(id);
    } catch (err) {
      // 6. Error is thrown, reset the target record back to previous state
      updateRow(id, {
        isUpdatePerforming: false,
        updatingStatus: undefined,
      });
      // 7. Show error feedback to user
      toast.error(
        `Failed to Delete ${currentRecord.shortenedUrl}. Error: ${err}`
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <table className="w-full max-h-full overflow-scroll">
      <thead>
        <tr className="border-b border-gray-300 p-1">
          <th className="text-left sm:p-1 md:p-2">ORIGINAL URL</th>
          <th className="text-left sm:p-1 md:p-2">MINI URL</th>
          <th className="text-left sm:p-1 md:p-2">DESCRIPTION</th>
          <th className="text-left sm:p-1 md:p-2">STATUS</th>
          <th className="text-left sm:p-1 md:p-2">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((d) => (
          <tr
            key={d.id}
            className={clsx(
              "border-b border-gray-300 p-1",
              d.isUpdatePerforming && "opacity-50"
            )}
          >
            <td className="text-left sm:p-1 md:p-2 break-all max-w-48">
              {d.url}
            </td>
            <td className="text-left sm:p-1 md:p-2">
              {d.shortenedUrl}
              <CopyToClipboardBtn text={d.shortenedUrl} />
            </td>
            <td className="text-left sm:p-1 md:p-2 break-all max-w-48">
              {d.description}
            </td>
            {renderStatusCell(d)}
            <ActionableCell
              data={d}
              isAdmin={userRole === AdminRole}
              isLoading={isLoading}
              approveOrRejectCb={onApproveOrDenyRecord}
              deleteCb={onDeleteRecord}
            />
          </tr>
        ))}
        {!rows.length && (
          <tr>
            <td colSpan={5}>
              <div className="flex flex-col items-center justify-center p-8 text-center border-b border-gray-300">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No records found
                </h3>
                <p className="text-gray-500 max-w-sm">
                  There are no records to display at the moment.
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

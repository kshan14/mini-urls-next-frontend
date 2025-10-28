import React from "react";

import clsx from "clsx";

import {
  GetMiniUrlResponse,
  UrlStatus,
  ApprovedUrlStatus,
  RejectedUrlStatus,
} from "@/lib/apis/miniurls/types";

interface ActionButtonProps {
  label: string;
  color: "green" | "red";
  onClick(): void;
  disabled: boolean;
}
const ActionButton = ({
  label,
  color,
  onClick,
  disabled,
}: ActionButtonProps): React.ReactNode => {
  const colorMap = {
    red: "text-red-700 bg-red-100 hover:bg-red-200",
    green: "text-green-700 bg-green-100 hover:bg-green-200",
  };
  const styles = clsx("p-1 font-semibold rounded-sm", colorMap[color]);
  return (
    <button className={styles} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

interface ActionableCellProps {
  data: GetMiniUrlResponse & { isUpdatePerforming?: boolean };
  isAdmin: boolean;
  isLoading: boolean;
  approveOrRejectCb(id: string, status: UrlStatus): void;
  deleteCb(id: string): void;
}

// ActionableCell is responsible for showing Approve, Deny and Delete button based on user role and record status
export default function ActionableCell({
  data,
  isAdmin,
  isLoading,
  approveOrRejectCb,
  deleteCb,
}: ActionableCellProps): React.ReactNode {
  // only admin can approve or deny
  const showApproveBtn = isAdmin && data.status !== ApprovedUrlStatus;
  const showRejectBtn = isAdmin && data.status !== RejectedUrlStatus;
  // only user can delete their own record
  const showDeleteBtn = !isAdmin;
  return (
    <td className="min-w-50">
      <div className="flex items-center gap-1">
        {showApproveBtn && (
          <ActionButton
            color="green"
            label="Approve"
            onClick={() => approveOrRejectCb(data.id, ApprovedUrlStatus)}
            disabled={isLoading}
          />
        )}
        {showRejectBtn && (
          <ActionButton
            color="red"
            label="Reject"
            onClick={() => approveOrRejectCb(data.id, RejectedUrlStatus)}
            disabled={isLoading}
          />
        )}
        {showDeleteBtn && (
          <ActionButton
            color="red"
            label="Delete"
            disabled={isLoading}
            onClick={() => deleteCb(data.id)}
          />
        )}
      </div>
    </td>
  );
}

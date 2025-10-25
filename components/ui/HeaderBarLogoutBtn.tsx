"use client";

import { logoutAction } from "@/actions/logout";

export default function HeaderBarLogoutBtn() {
  return (
    <button
      className="p-2 bg-blue-500 hover:bg-blue-600 text-white py-3 font-bold rounded-lg"
      onClick={logoutAction}
    >
      Logout
    </button>
  );
}

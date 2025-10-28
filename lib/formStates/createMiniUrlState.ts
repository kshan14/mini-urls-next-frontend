import { ActionState } from "@/actions/miniurl";

export const initialState: ActionState = {
  url: "",
  description: "",
  createdUrlInfo: undefined,
  errors: {},
  createUrlError: undefined,
};

import { ActionState } from "@/actions/createMiniUrl";

export const initialState: ActionState = {
  url: "",
  description: "",
  createdUrlInfo: undefined,
  errors: {},
  createUrlError: undefined,
};

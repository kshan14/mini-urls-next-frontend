import { ActionState } from "@/actions/register";

export const initialState: ActionState = {
  errors: {},
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
};

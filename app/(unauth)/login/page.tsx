"use client";

import { useActionState } from "react";

import UserFormHeader from "@/components/ui/UserFormHeader";
import Input from "@/components/ui/Input";
import SubmitBtn from "@/components/ui/SubmitBtn";
import UserFormRedirectFooter from "@/components/ui/UserFormRedirectFooter";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

import { loginAction } from "@/actions/login";
import { initialState } from "@/lib/formStates/loginState";

export default function Login() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );
  return (
    <>
      {pending && <LoadingOverlay />}
      {/* Header */}
      <UserFormHeader
        headerLabel="Login to your Account"
        subHeaderLabel="Welcome back! Please enter your details."
      />
      {/* Login Form */}
      <form action={formAction} className="sm:w-[80%] md:w-[30%]">
        <div className="mb-5">
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            label="Username"
            defaultValue={state.username}
            error={state.errors?.username}
          />
        </div>
        <div className="mb-6">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            label="Password"
            defaultValue={state.password}
            error={state.errors?.password}
          />
        </div>
        <SubmitBtn text="Login" />
        {state.loginError && (
          <p className="text-red-500 text-1xl mt-1" id={`login-error`}>
            {state.loginError}
          </p>
        )}
        <UserFormRedirectFooter
          label="Don't have an account?"
          linkLabel="Register"
          linkHref="/register"
        />
      </form>
    </>
  );
}

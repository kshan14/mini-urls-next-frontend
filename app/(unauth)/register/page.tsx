"use client";

import { useActionState } from "react";

import UserFormHeader from "@/components/ui/UserFormHeader";
import Input from "@/components/ui/Input";
import SubmitBtn from "@/components/ui/SubmitBtn";
import UserFormRedirectFooter from "@/components/ui/UserFormRedirectFooter";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

import { registerAction } from "@/actions/register";
import { initialState } from "@/lib/formStates/registerState";

export default function Register() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState
  );
  return (
    <>
      {pending && <LoadingOverlay />}
      {/* Header */}
      <UserFormHeader
        headerLabel="Create Your Account"
        subHeaderLabel="Manage your shortened URLs with ease"
      />
      {/* Registration Form */}
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
        <div className="mb-5">
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email"
            label="Email"
            defaultValue={state.email}
            error={state.errors?.email}
          />
        </div>
        <div className="mb-5">
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
        <div className="mb-5">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            label="Confirm Password"
            defaultValue={state.confirmPassword}
            error={state.errors?.confirmPassword}
          />
        </div>
        <SubmitBtn text="Register" />
        {state.registerError && (
          <p className="text-red-500 text-1xl mt-1" id={`login-error`}>
            {state.registerError}
          </p>
        )}
        <UserFormRedirectFooter
          label="Already have an account?"
          linkLabel="Login"
          linkHref="/login"
        />
      </form>
    </>
  );
}

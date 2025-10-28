"use client";

import { useActionState } from "react";

import Input from "@/components/ui/Input";
import UserFormHeader from "@/components/ui/UserFormHeader";
import SubmitBtn from "@/components/ui/SubmitBtn";

import { createMiniUrlAction } from "@/actions/miniurl";
import { initialState } from "@/lib/formStates/createMiniUrlState";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import MiniUrlCreationSuccessMessage from "@/components/ui/MiniUrlCreationSuccessMessage";

export default function CreateUrl() {
  const [state, formAction, pending] = useActionState(
    createMiniUrlAction,
    initialState
  );
  return (
    <>
      {pending && <LoadingOverlay />}
      {/* Header */}
      <UserFormHeader
        headerLabel="Create a mini url"
        subHeaderLabel="Please enter your mini url details"
      />
      {/* Url Creation Form */}
      <form action={formAction} className="sm:w-full md:w-[40%]">
        <div className="mb-5">
          <Input
            id="url"
            name="url"
            type="text"
            placeholder="Enter your original url"
            label="Original Url"
            defaultValue={state.url}
            error={state.errors?.url}
          />
        </div>
        <div className="mb-5">
          <Input
            id="description"
            name="description"
            type="text"
            placeholder="Enter Description"
            label="Description"
            defaultValue={state.description}
            error={state.errors?.description}
          />
        </div>
        <SubmitBtn text="Register" />
        {state.createUrlError && (
          <p className="text-red-500 text-1xl mt-1" id={`create-url-error`}>
            {state.createUrlError}
          </p>
        )}
        {state.createdUrlInfo && (
          <MiniUrlCreationSuccessMessage
            shortenedUrl={state.createdUrlInfo.shortenedUrl}
          />
        )}
      </form>
    </>
  );
}

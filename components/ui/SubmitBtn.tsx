import React from "react";

const SubmitBtn = React.forwardRef<HTMLButtonElement, { text: string }>(
  ({ text }, ref) => {
    return (
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 font-bold rounded-lg"
      >
        {text}
      </button>
    );
  }
);

SubmitBtn.displayName = "SubmitButton";

export default SubmitBtn;

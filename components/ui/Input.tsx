import React from "react";

interface InputProps {
  type: "text" | "password";
  label: string;
  id: string;
  name: string;
  placeholder: string;
  defaultValue: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, id, name, placeholder, defaultValue, error }, ref) => {
    return (
      <div className="w-full">
        <label htmlFor={id} className="font-bold mb-1">
          {label}
        </label>
        <input
          id={id}
          name={name}
          ref={ref}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
        {error && (
          <p className="text-red-500 text-sm mt-1" id={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

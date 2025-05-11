import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: "text" | "password";
  as?: "input" | "select";
  listPlaceholder?: string;
  children?: React.ReactNode;
  errorMessage?: string;
}

const inputFieldStyles =
  "w-full bg-white text-textMain text-base font-medium border border-borderGray rounded-xl px-4 py-3 placeholder-placeholderGray focus:outline-none focus:ring-2 focus:ring-primary";

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  as = "input",
  listPlaceholder,
  children,
  errorMessage,
}) => {
  return (
    <div className="w-full space-y-1">
      <label htmlFor={name} className="text-sm font-semibold text-black">
        {label}
      </label>

      {as === "input" ? (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={inputFieldStyles}
        />
      ) : (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputFieldStyles}
        >
          <option className="text-placeholderGray" value="" disabled hidden>
            {listPlaceholder}
          </option>

          {children}
        </select>
      )}
      {errorMessage && (
        <p className="text-sm text-errorText font-medium mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;

import React from "react";

interface InputFieldProps {
  label?: string;
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
  trailingIcon?: React.ReactNode;
}

const inputFieldStyles =
  "w-full bg-white text-textMain text-base font-medium border border-borderGray rounded-xl px-4 py-3 pr-10 placeholder-placeholderGray focus:outline-none focus:ring-2 focus:ring-primary";

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
  trailingIcon,
}) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-black">
          {label}
        </label>
      )}

      <div className="relative">
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

        {trailingIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-textMuted">
            {trailingIcon}
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="text-sm text-errorText font-medium mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;

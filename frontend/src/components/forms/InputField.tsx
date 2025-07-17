import React, { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import clsx from "clsx";
import { isRtl } from "i18n/getDirection";

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
  "appearance-none w-full bg-white text-textMain border border-borderGray rounded-xl px-4 py-4 md:py-3 placeholder-placeholderGray focus:outline-none focus:ring-2 focus:ring-primary";

export default function InputField({
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
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const computedType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={name} className="text-lg text-black">
          {label}
        </label>
      )}

      <div className="relative">
        {as === "input" ? (
          <input
            id={name}
            name={name}
            type={computedType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={inputFieldStyles}
          />
        ) : (
          <>
            <select
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              className={clsx(
                " appearance-none",
                inputFieldStyles,
                isRtl() ? "pl-10" : "pr-10"
              )}
            >
              <option className="text-placeholderGray" value="" disabled hidden>
                {listPlaceholder}
              </option>
              {children}
            </select>

            {!trailingIcon && (
              <ChevronDown
                className={clsx(
                  "w-4 h-4 text-textSubtle absolute top-1/2 transform -translate-y-1/2 pointer-events-none",
                  isRtl() ? "left-3" : "right-3"
                )}
              />
            )}
          </>
        )}

        {!isPasswordField && trailingIcon && (
          <div
            className={clsx(
              "absolute top-1/2 transform -translate-y-1/2 cursor-pointer text-textSubtle",
              isRtl() ? "left-3" : "right-3"
            )}
          >
            {trailingIcon}
          </div>
        )}

        {isPasswordField && (
          <div
            className={clsx(
              "absolute  top-1/2 transform -translate-y-1/2 cursor-pointer text-textSubtle",
              isRtl() ? "left-3" : "right-3"
            )}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
}

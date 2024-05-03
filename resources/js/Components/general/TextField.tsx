import { cn, formatNumber, isNumber } from "@/Utils/Utils";
import React, { ChangeEventHandler, useEffect, useState } from "react";

type TTextFieldProps<
  Type extends React.InputHTMLAttributes<HTMLInputElement>["type"],
  InputValue extends Type extends "number" ? number : string
> = {
  placeholder: string;
  label: string;
  className?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  errorMessage?: string;
  hint?: string;
  defaultValue?: InputValue;
  onChange?: (value: InputValue | undefined) => void;
};

export default function TextField<
  T extends React.InputHTMLAttributes<HTMLInputElement>["type"],
  V extends T extends "number" ? number : string
>({
  placeholder,
  label,
  className,
  type: type,
  hint,
  errorMessage,
  defaultValue,
  onChange,
}: TTextFieldProps<T, V>) {
  const [value, setValue] = useState(() => {
    if (defaultValue) return defaultValue;
    if (type === "number") return undefined;
    return "";
  });

  useEffect(() => {
    setValue(() => {
      if (defaultValue) return defaultValue;
      if (type === "number") return undefined;
      return "";
    });
  }, [defaultValue]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    let value = e.target.value;

    // Handles deleting input to nothing
    if (!e.target.value) {
      setValue(type === "number" ? undefined : "");
      if (onChange) onChange(undefined);
      return;
    }

    // Remove any suffixes before checking with isNumber
    if (type === "number") {
      value = value.split(".").join("");
    }
    const inputIsNumber = isNumber(value);

    if (type === "number" && !inputIsNumber) return;
    const newValue = (
      type === "number" ? Number(value) : value
    ) as NonNullable<V>;
    setValue(newValue);

    if (onChange) onChange(newValue);
  };

  return (
    <div className={cn("grid grid-cols-[auto_1fr]", className)}>
      <p className="self-start text-sm">{label}</p>
      {errorMessage && (
        <p className="justify-self-end self-end text-[.75rem] text-red-500">
          {errorMessage}
        </p>
      )}
      <input
        type={type === "number" ? "text" : type}
        className={cn(
          "col-span-2 mt-2 rounded-lg px-5 py-3 border-lighter placeholder:text-lighter focus:border-accent text-sm"
        )}
        onChange={handleChange}
        value={
          type === "number" && typeof value === "number"
            ? formatNumber(value)
            : value
        }
        placeholder={placeholder}
      />
      <p className={cn("col-span-2 mt-2 text-[0.75rem] text-light")}>{hint}</p>
    </div>
  );
}

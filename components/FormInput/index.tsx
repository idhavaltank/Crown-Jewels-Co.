import "./formInput.css";

import { FormInputPropsType } from "./types";

const FormInput = (props: FormInputPropsType) => {
  const { label, className, error, inputProps } = props;
  return (
    <div className="mb-4">
      <label
        htmlFor={inputProps?.id}
        className="block text-text font-semibold mb-1"
      >
        {label}
      </label>
      <input
        id={inputProps?.id}
        className={`border border-border bg-background text-text p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition ${
          error ? "border-error" : ""
        } ${className}`}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputProps?.id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <p id={`${inputProps?.id}-error`} className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;

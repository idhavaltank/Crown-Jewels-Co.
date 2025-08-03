// 1. Styles
import "./formInput.css";

// 2. Types
import { FormInputPropsType } from "./types";

const FormInput = (props: FormInputPropsType) => {
  // 1. Props destructuring
  const { label, className, error, inputProps } = props;

  // 2. Return JSX for label, input and error message if exists
  return (
    <div className="mb-4">
      {/* Label for input */}
      <label
        htmlFor={inputProps?.id}
        className="block text-text font-semibold mb-1"
      >
        {label}
      </label>

      {/* Input element spreading passed props and adding conditional classes and ARIA attributes */}
      <input
        id={inputProps?.id}
        className={`border border-border bg-background text-text p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition ${
          error ? "border-error" : ""
        } ${className}`}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${inputProps?.id}-error` : undefined}
        {...inputProps}
      />

      {/* Error message if error string provided */}
      {error && (
        <p id={`${inputProps?.id}-error`} className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;

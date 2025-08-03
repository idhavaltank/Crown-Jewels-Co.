import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface FormInputPropsType {
  label: string;
  error?: string;
  className?: string;
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

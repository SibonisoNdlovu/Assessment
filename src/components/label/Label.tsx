import React, { HTMLAttributes } from "react";
import "./Label.css";

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

const Label = ({ htmlFor, required, children, ...rest }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`label ${required ? "required" : ""}`}
      {...rest}
    >
      {children}
    </label>
  );
};

export default Label;

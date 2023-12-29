import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const Button = ({
  variant = "primary",
  size = "medium",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button className={`button ${variant} ${size}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;

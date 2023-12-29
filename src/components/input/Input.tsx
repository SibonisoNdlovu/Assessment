import React, { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...rest }: InputProps) => {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <input className="input" {...rest} />
    </div>
  );
};

export default Input;

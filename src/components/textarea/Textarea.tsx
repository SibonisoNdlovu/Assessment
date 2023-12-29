import React, { TextareaHTMLAttributes } from "react";
import Label from "../label/Label";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...rest }) => {
  return (
    <div className="textarea-container">
      {label && <Label htmlFor={""} children={label}></Label>}
      <textarea className="textarea" {...rest} />
    </div>
  );
};

export default Textarea;

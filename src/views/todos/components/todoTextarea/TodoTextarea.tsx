import React, { TextareaHTMLAttributes } from "react";
import "./TodoTextarea.css";

interface TodoTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TodoTextarea: React.FC<TodoTextareaProps> = ({ label, ...rest }) => {
  return (
    <div className="todo-textarea-container">
      {label && <label className="todo-label">{label}</label>}
      <textarea className="todo-textarea" {...rest} />
    </div>
  );
};

export default TodoTextarea;

import React from "react";
import "./Button.css";

function Button({ children, onClick, ...rest }) {
  return (
    <button {...rest} onClick={onClick} className="btn">
      {children}
    </button>
  );
}

export default Button;

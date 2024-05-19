import React from "react";

import { useStateContext } from "../context/ContextProvider";

const Button = ({ icon, size, text, className, type, onClick }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {icon} {text}
    </button>
  );
};

export default Button;

import React from "react";

import { useStateContext } from "../context/ContextProvider";

const Button = ({ icon, size, text, className, type }) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type={type}
      onClick={() => setIsClicked(initialState)}
      className={className}
    >
      {icon} {text}
    </button>
  );
};

export default Button;

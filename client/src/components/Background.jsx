import React from "react";

const Background = ({ children }) => {
  return (
    <div className=".light bg-background dark:.dark dark:bg-background">
      {children}
    </div>
  );
};

export default Background;

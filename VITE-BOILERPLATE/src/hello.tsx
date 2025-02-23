import React from "react";

export const HelloComponent: React.FC = () => {
  const name = "Monika";

  return (
    <>
      <h1>Hello from React, {name}!</h1>
    </>
  );
};

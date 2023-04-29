import React from "react";

export const ErrorCategory = ({ props }) => {
  return (
    <div className="category__error">
      <p className="error__paragraph">Wybierz kategorię {props} </p>
    </div>
  );
};

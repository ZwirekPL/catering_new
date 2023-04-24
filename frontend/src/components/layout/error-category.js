import React from "react";

export const ErrorCategory = ({ props }) => {
  return (
    <div className="category-error">
      <p className="error-paragraph">Wybierz kategorię {props} </p>
    </div>
  );
};

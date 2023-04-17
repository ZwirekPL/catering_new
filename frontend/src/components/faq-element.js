import React, { useState } from "react";

const FaqElement = ({ answer, question }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq__element">
      <button
        className={open ? "element__header-open" : "element__header"}
        onClick={() => setOpen(!open)}
      >
        <p>{question}</p>
        <div className={open ? "header__arrow-open" : "header__arrow"}>
          &#8249;
        </div>
      </button>
      {open && (
        <div className="element__body">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};
export default FaqElement;

import React from "react";
import { useAccordionContext } from "./context";

/**
 * As per "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/", Keyboard support should only be this -
 * - Space or Enter
 * - Tab
 * - Shift + Tab
 */
function AccordionItem({ title, content, index }) {
  const { activeIndex, setActiveIndex } = useAccordionContext();
  const clickHandler = () => {
    if (activeIndex === index) {
      setActiveIndex(null);
      return;
    }
    setActiveIndex(index);
  };

  return (
    <div>
      <button
        onClick={clickHandler}
        aria-expanded={activeIndex === index}
        aria-controls={`content_${index}`}
        id={`accordion_${index}`}
      >
        {title}
      </button>
      {activeIndex === index && (
        <div id={`content_${index}`} aria-labelledby={`accordion_${index}`}>
          {content}
        </div>
      )}
    </div>
  );
}

export default AccordionItem;

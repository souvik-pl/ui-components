import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

function Modal({
  children,
  isOpen,
  onClose,
  width,
  height,
  ariaLabelledBy,
  ariaDescribedBy,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const handlePressEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handlePressEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handlePressEscape);
    };
  }, []);

  return (
    isOpen && (
      <div className={styles.backdrop}>
        <div
          ref={ref}
          className={styles.content}
          style={{ width, height }}
          role="dialog"
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
        >
          {children}
        </div>
      </div>
    )
  );
}

export default Modal;

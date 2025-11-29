import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";

const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handler]);
};

const DataContext = createContext();
const DialogContext = createContext();

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("DataContext should be used within Dialog component");
  }
  return context;
};

const Dialog = ({ children, open, setOpen }) => {
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  return (
    <DataContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <DialogContext.Provider value={true}>{children}</DialogContext.Provider>
    </DataContext.Provider>
  );
};

Dialog.Trigger = ({ children }) => {
  const { open, setOpen, triggerRef } = useDataContext();

  const context = useContext(DialogContext);
  if (!context) {
    console.error("Dialog.Trigger should be used within Dialog");
  }

  return (
    <button
      ref={triggerRef}
      onClick={() => setOpen(true)}
      onMouseDown={(e) => e.stopPropagation()}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls="dialog-content"
    >
      {children}
    </button>
  );
};

Dialog.Content = ({ children }) => {
  const { open, setOpen, contentRef, triggerRef } = useDataContext();
  useOutsideClick(contentRef, () => setOpen(false));

  const context = useContext(DialogContext);
  if (!context) {
    console.error("Dialog.Content should be used within Dialog");
  }

  useEffect(() => {
    if (!open) return;

    const dialog = contentRef.current;
    // Store previous focus
    const previouslyFocusedElement = document.activeElement;
    // Move focus to dialog
    const firstFocusableElement = dialog.querySelector(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusableElement && firstFocusableElement.focus();

    // Trap focus
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const focusableEls = dialog.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];
      if (e.shiftKey) {
        // SHIFT + TAB
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      // Restore focus to trigger
      previouslyFocusedElement?.focus();
    };
  }, [open, setOpen]);

  return (
    open &&
    createPortal(
      <div
        id="dialog-content"
        role="dialog"
        aria-modal="true"
        ref={contentRef}
        className="dialog"
      >
        {children}
      </div>,
      document.body
    )
  );
};

Dialog.Overlay = () => {
  const { open } = useDataContext();

  const context = useContext(DialogContext);
  if (!context) {
    console.error("Dialog.Overlay should be used within Dialog");
  }

  return (
    open && createPortal(<div className="dialog_overlay"></div>, document.body)
  );
};

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} setOpen={setOpen}>
      <Dialog.Trigger>Click</Dialog.Trigger>
      <Dialog.Content>
        <div className="container">
          <div className="header">
            Modal
            <button onClick={() => setOpen(false)}>X</button>
          </div>
          Enter Name
          <input />
        </div>
      </Dialog.Content>
      <Dialog.Overlay />
    </Dialog>
  );
}

export default App;

/*

<Dialog>
  <Dialog.Trigger>Open dialog</Dialog.Trigger>
  <Dialog.Content>
    Hi dialog
  </Dialog.Content>
  <Dialog.Overlay/>
</Dialog>

- Basic UI (React portal + compound component) ✅
- Basic open/close ✅
- Overlay ✅
- Controlled component ✅
- Esc to close ✅
- Focus Trap and restoration ✅
- Accessibility ✅
- Compound component restriction ✅

*/

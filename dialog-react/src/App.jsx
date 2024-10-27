import React, { useState } from "react";
import Modal from "./Modal/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        width={500}
        height={300}
        ariaLabelledBy={"title_1"}
        ariaDescribedBy={"content_1"}
      >
        <div
          id="title_1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Dialog title
          <button onClick={handleClose}>X</button>
        </div>
        <div id="content_1">Dialog content</div>
      </Modal>
    </div>
  );
}

export default App;

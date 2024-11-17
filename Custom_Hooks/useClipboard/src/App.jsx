import React, { useState } from "react";
import useClipboard from "./useClipboard";

function App() {
  const [inputText, setInputText] = useState("");
  const { isCopied, error, copyToClipboard } = useClipboard();
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Type and press copy"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={() => copyToClipboard(inputText)}>Copy</button>
      </div>
      {isCopied && <p>Copied to clipboard</p>}
      {error && <p>{error}</p>}
    </>
  );
}

export default App;

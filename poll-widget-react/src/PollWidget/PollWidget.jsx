import React, { useState } from "react";

function PollWidget({ pollData, onVoteSubmit, onVoteRemove }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [result, setResult] = useState(null);

  const selectHandler = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((data) => data !== id));
    } else {
      if (pollData.multiAnswer) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([id]);
      }
    }
  };

  const submitHandler = async () => {
    const result = await onVoteSubmit(pollData.id, selectedIds);
    setResult(result);
    setSelectedIds([]);
  };

  const removeHandler = async () => {
    const result = await onVoteRemove(pollData.id);
    setResult(null);
  };

  return (
    <div
      style={{
        width: "400px",
        border: "1px solid black",
        padding: "10px",
      }}
    >
      <h3>{pollData.question}</h3>
      {pollData.options.map((option) => (
        <div
          key={option.id}
          style={{
            width: "100%",
            height: "40px",
            border: "1px solid black",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            padding: "5px",
            backgroundColor: selectedIds.includes(option.id)
              ? "lightgray"
              : "white",
          }}
          onClick={() => selectHandler(option.id)}
        >
          {option.label}{" "}
          {result &&
            `(${
              (result.answers.find((item) => item.id === option.id).votes /
                result.totalVote) *
              100
            }%)`}
        </div>
      ))}
      {result ? (
        <button
          style={{
            height: "30px",
            marginTop: "10px",
            width: "100px",
          }}
          onClick={removeHandler}
        >
          Remove vote
        </button>
      ) : (
        <button
          style={{
            height: "30px",
            marginTop: "10px",
            width: "100px",
          }}
          disabled={selectedIds.length === 0}
          onClick={submitHandler}
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default PollWidget;

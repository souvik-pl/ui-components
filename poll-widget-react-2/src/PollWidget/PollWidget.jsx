import React from "react";
import "./PollWidget.css";
import { useState } from "react";

const PollWidget = ({
  pollId,
  question,
  isMultiple,
  options,
  onVote,
  onRemove,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [resultList, setResultList] = useState([]);

  const handleSelect = (id) => {
    if (resultList.length > 0) return;
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((data) => data !== id));
    } else {
      if (isMultiple) {
        setSelectedIds((prev) => [...prev, id]);
      } else {
        setSelectedIds([id]);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const resultList = await onVote(pollId, selectedIds);
      setResultList(resultList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async () => {
    try {
      const resultList = await onRemove(pollId);
      setResultList([]);
      setSelectedIds([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="widget_container">
      <h3>{question}</h3>
      <ul className="options">
        {options.map((item) => (
          <li
            key={item.id}
            className={`item ${
              selectedIds.includes(item.id) ? "item-selected" : ""
            }`}
            onClick={() => handleSelect(item.id)}
          >
            {item.label}{" "}
            {resultList.length > 0 &&
              `(${
                resultList.find((result) => result.id === item.id).votes
              } votes)`}
          </li>
        ))}
      </ul>
      {resultList.length > 0 ? (
        <button className="btn" onClick={handleRemove}>
          Remove Vote
        </button>
      ) : (
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default PollWidget;

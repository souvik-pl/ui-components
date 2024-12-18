import React from "react";
import PollWidget from "./PollWidget/PollWidget";

function App() {
  const pollData = {
    id: "p1",
    question: "What is your favorite color?",
    multiAnswer: false,
    options: [
      { id: "o1", label: "Red" },
      { id: "o2", label: "Blue" },
      { id: "o3", label: "Green" },
    ],
  };

  const onVoteSubmit = async (pollId, selectedIds) => {
    console.log([pollId, selectedIds]);
    return new Promise((resolve, reject) => {
      const data = {
        totalVote: 20,
        answers: [
          {
            id: "o1",
            votes: 10,
          },
          {
            id: "o2",
            votes: 3,
          },
          {
            id: "o3",
            votes: 7,
          },
        ],
      };
      resolve(data);
    });
  };

  const onVoteRemove = async (pollId) => {
    console.log(pollId);
    return new Promise((resolve) => {
      resolve();
    });
  };

  return (
    <div
      style={{
        marginLeft: "200px",
        marginTop: "200px",
      }}
    >
      <PollWidget
        pollData={pollData}
        onVoteSubmit={onVoteSubmit}
        onVoteRemove={onVoteRemove}
      />
    </div>
  );
}

export default App;

/**
 *
 * {
 *  question: string;
 *  multiAnswer: boolean;
 *  options: [
 *    {
 *      id: string;
 *      label: string;
 *    }
 *  ]
 * }
 *
 *
 * - remove vote
 * - submit vote
 */

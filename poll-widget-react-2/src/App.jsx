import React from "react";
import PollWidget from "./PollWidget/PollWidget";

function App() {
  const pollData = {
    id: "p1",
    question: "What is your favorite color?",
    isMultiple: true,
    options: [
      { id: "o1", label: "Red", votes: 5 },
      { id: "o2", label: "Green", votes: 15 },
      { id: "o3", label: "Blue", votes: 25 },
    ],
  };

  const onVote = async (pollId, selectedIds) => {
    console.log(pollId);
    console.log(selectedIds);
    //Call an API here
    return Promise.resolve([
      { id: "o1", label: "Red", votes: 6 },
      { id: "o2", label: "Green", votes: 16 },
      { id: "o3", label: "Blue", votes: 25 },
    ]);
  };

  const onRemove = async (pollId) => {
    console.log(pollId);
    //Call an API here
    return Promise.resolve([
      { id: "o1", label: "Red", votes: 5 },
      { id: "o2", label: "Green", votes: 15 },
      { id: "o3", label: "Blue", votes: 25 },
    ]);
  };

  return (
    <div>
      <PollWidget
        pollId={pollData.id}
        question={pollData.question}
        isMultiple={pollData.isMultiple}
        options={pollData.options}
        onVote={onVote}
        onRemove={onRemove}
      />
    </div>
  );
}

export default App;

/*

type PollData {
	id: string;
	question: string;
	isMultiple: boolean;
	opions: Option[]
}

type Option = {
	id: string;
	label: string;
	votes: number;
}

type PollWidgetProps = {
	pollId: string;
	question: string;
	isMultuple: boolean;
	options: Option[];
	onVote: (pollId: string, selectedIds: string[]) => Promise<Option[]>;
	onRemove: (pollId: string) => Promise<Option[]>;
	styles?: PollStyles
}

type PollStyles = {
	container?: CSSProperties;
	title?: CSSProoperties;
	...
}

*/

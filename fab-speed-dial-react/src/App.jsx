import React from "react";
import FloatingActionButton from "./FloatingActionButton/FloatingActionButton";
import cutIcon from "./assets/cut.svg";
import copyIcon from "./assets/copy.svg";
import dialerIcon from "./assets/dialer.svg";
import ActionButton from "./FloatingActionButton/ActionButton";

function CutIcon() {
  return <img src={cutIcon} />;
}

function CopyIcon() {
  return <img src={copyIcon} />;
}

function DialerIcon() {
  return <img src={dialerIcon} />;
}

const actionList = [
  {
    label: "Copy",
    icon: <CopyIcon />,
    handler: () => console.log("Copy"),
  },
  {
    label: "Cut",
    icon: <CutIcon />,
    handler: () => console.log("Cut"),
  },
  {
    label: "Call",
    icon: <DialerIcon />,
    handler: () => console.log("Call"),
  },
];

function App() {
  return (
    <FloatingActionButton>
      {actionList.map((action, index) => (
        <ActionButton
          key={index}
          label={action.label}
          icon={action.icon}
          clickHandler={action.handler}
        />
      ))}
    </FloatingActionButton>
  );
}

export default App;

import React, { useState } from "react";

const CHECKBOX_DATA = [
  {
    id: 1,
    label: "Checkbox 1",
    children: [
      {
        id: 2,
        label: "Checkbox 2",
        children: [
          {
            id: 3,
            label: "Checkbox 3",
          },
          {
            id: 4,
            label: "Checkbox 4",
          },
        ],
      },
      {
        id: 5,
        label: "Checkbox 5",
        children: [
          {
            id: 6,
            label: "Checkbox 6",
          },
          {
            id: 7,
            label: "Checkbox 7",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    label: "Checkbox 8",
    children: [
      {
        id: 9,
        label: "Checkbox 9",
        children: [
          {
            id: 10,
            label: "Checkbox 10",
          },
          {
            id: 11,
            label: "Checkbox 11",
          },
        ],
      },
    ],
  },
];

const CheckboxRenderer = ({ checkboxData, selected, setSelected }) => {
  const checkHandler = (value, node) => {
    setSelected((prev) => {
      const newState = { ...prev, [node.id]: value };
      const updateChildren = (node) => {
        node.children?.forEach((child) => {
          newState[child.id] = value;
          if (child.children) updateChildren(child);
        });
      };

      updateChildren(node);

      const checkParent = (node) => {
        if (!node.children) return newState[node.id] || false;
        const allChildrenChecked = node.children.every((child) =>
          checkParent(child)
        );
        newState[node.id] = allChildrenChecked;
        return allChildrenChecked;
      };

      CHECKBOX_DATA.forEach((node) => checkParent(node));

      return newState;
    });
  };

  return checkboxData.map((node) => (
    <div key={node.id} style={{ paddingLeft: "15px" }}>
      <label>
        <input
          type="checkbox"
          checked={selected[node.id] || false}
          onChange={(e) => checkHandler(e.target.checked, node)}
        />
        {node.label}
      </label>
      {node.children && (
        <CheckboxRenderer
          checkboxData={node.children}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </div>
  ));
};

const App = () => {
  const [selected, setSelected] = useState({});

  return (
    <div>
      <CheckboxRenderer
        checkboxData={CHECKBOX_DATA}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox/Checkbox";

export const CheckboxState = {
  Unchecked: 0,
  Checked: 1,
  Indeterminate: -1,
};

const CHECKBOX_LIST = [
  {
    id: "1",
    state: CheckboxState.Unchecked,
    label: "Checkbox 1",
    children: [
      {
        id: "1-1",
        state: CheckboxState.Unchecked,
        label: "Checkbox 1.1",
        children: [
          {
            id: "1-1-1",
            state: CheckboxState.Unchecked,
            label: "Checkbox 1.1.1",
            children: [],
          },
          {
            id: "1-1-2",
            state: CheckboxState.Unchecked,
            label: "Checkbox 1.1.2",
            children: [],
          },
        ],
      },
      {
        id: "1-2",
        state: CheckboxState.Unchecked,
        label: "Checkbox 1.2",
        children: [
          {
            id: "1-2-1",
            state: CheckboxState.Unchecked,
            label: "Checkbox 1.2.1",
            children: [
              {
                id: "1-2-1-1",
                state: CheckboxState.Unchecked,
                label: "Checkbox 1.2.1.1",
                children: [
                  {
                    id: "1-2-1-1-1",
                    state: CheckboxState.Unchecked,
                    label: "Checkbox 1.2.1.1.1",
                    children: [],
                  },
                  {
                    id: "1-2-1-1-2",
                    state: CheckboxState.Unchecked,
                    label: "Checkbox 1.2.1.1.2",
                    children: [],
                  },
                ],
              },
              {
                id: "1-2-1-2",
                state: CheckboxState.Unchecked,
                label: "Checkbox 1.2.1.2",
                children: [
                  {
                    id: "1-2-1-2-1",
                    state: CheckboxState.Unchecked,
                    label: "Checkbox 1.2.1.2.1",
                    children: [],
                  },
                  {
                    id: "1-2-1-2-2",
                    state: CheckboxState.Unchecked,
                    label: "Checkbox 1.2.1.2.2",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "1-2-2",
            state: CheckboxState.Unchecked,
            label: "Checkbox 1.2.2",
            children: [
              {
                id: "1-2-2-1",
                state: CheckboxState.Unchecked,
                label: "Checkbox 1.2.2.1",
                children: [
                  {
                    id: "1-2-2-1-1",
                    state: CheckboxState.Unchecked,
                    label: "Checkbox 1.2.2.1.1",
                    children: [],
                  },
                  {
                    id: "1-2-2-1-2",
                    state: CheckboxState.Unchecked,
                    label: "Checkbox 1.2.2.1.2",
                    children: [],
                  },
                ],
              },
              {
                id: "1-2-2-2",
                state: CheckboxState.Unchecked,
                label: "Checkbox 1.2.2.2",
                children: [
                  {
                    id: "1-2-2-2-1",
                    state: CheckboxState.Unchecked,
                    label: "Checkbox 1.2.2.2.1",
                    children: [],
                  },
                  {
                    id: "1-2-2-2-2",
                    state: CheckboxState.Unchecked,
                    label: "Checkbox 1.2.2.2.2",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    state: CheckboxState.Unchecked,
    label: "Checkbox 2",
    children: [
      {
        id: "2-1",
        state: CheckboxState.Unchecked,
        label: "Checkbox 2.1",
        children: [
          {
            id: "2-1-1",
            state: CheckboxState.Unchecked,
            label: "Checkbox 2.1.1",
            children: [],
          },
          {
            id: "2-1-2",
            state: CheckboxState.Unchecked,
            label: "Checkbox 2.1.2",
            children: [],
          },
        ],
      },
    ],
  },
];

function App() {
  const [checkboxList, setCheckboxList] = useState(CHECKBOX_LIST);
  const handleChange = (id) => {
    const findNodeAndUpdate = (nodeList, id) => {
      for (const node of nodeList) {
        if (node.id === id) {
          toggleStateAndChildren(node);
          return true;
        } else {
          const found = findNodeAndUpdate(node.children, id);
          if (found) {
            updateParentState(nodeList);
            return true;
          }
        }
      }
      return false;
    };

    const toggleStateAndChildren = (node) => {
      if (node.state === CheckboxState.Checked) {
        node.state = CheckboxState.Unchecked;
        updateChildren(node.children, CheckboxState.Unchecked);
      } else {
        node.state = CheckboxState.Checked;
        updateChildren(node.children, CheckboxState.Checked);
      }
    };

    const updateChildren = (nodeList, newState) => {
      for (const node of nodeList) {
        node.state = newState;
        updateChildren(node.children, newState);
      }
    };

    const updateParentState = (nodeList) => {
      for (const node of nodeList) {
        if (node.children.length > 0) {
          const allChecked = node.children.every(
            (child) => child.state === CheckboxState.Checked
          );
          const allUnchecked = node.children.every(
            (child) => child.state === CheckboxState.Unchecked
          );

          if (allChecked) {
            node.state = CheckboxState.Checked;
          } else if (allUnchecked) {
            node.state = CheckboxState.Unchecked;
          } else {
            node.state = CheckboxState.Indeterminate;
          }

          // updateParentState(node.children);
        }
      }
    };

    findNodeAndUpdate(checkboxList, id);
    setCheckboxList(structuredClone(checkboxList));
  };

  useEffect(() => {
    console.log(checkboxList);
  }, [checkboxList]);

  return (
    <div>
      {checkboxList.map((checkbox) => (
        <Checkbox
          key={checkbox.id}
          id={checkbox.id}
          checkbox={checkbox}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
}

export default App;

import React, { useState } from "react";

const list_1 = [
  {
    id: "1",
    label: "Item 1",
  },
  {
    id: "2",
    label: "Item 2",
  },
  {
    id: "3",
    label: "Item 3",
  },
  {
    id: "4",
    label: "Item 4",
  },
  {
    id: "5",
    label: "Item 5",
  },
];

const list_2 = [
  {
    id: "6",
    label: "Item 6",
  },
  {
    id: "7",
    label: "Item 7",
  },
  {
    id: "8",
    label: "Item 8",
  },
  {
    id: "9",
    label: "Item 9",
  },
  {
    id: "10",
    label: "Item 10",
  },
];

function App() {
  const [list1, setList1] = useState(list_1);
  const [list2, setList2] = useState(list_2);
  const [selectedList1, setSelectedList1] = useState([]);
  const [selectedList2, setSelectedList2] = useState([]);

  const list1SelectionHandler = (data) => {
    const index = selectedList1.findIndex(
      (listData) => listData.id === data.id
    );
    if (index !== -1) {
      const list = [...selectedList1];
      list.splice(index, 1);
      setSelectedList1(list);
    } else {
      setSelectedList1([...selectedList1, data]);
    }
  };

  const list2SelectionHandler = (data) => {
    const index = selectedList2.findIndex(
      (listData) => listData.id === data.id
    );
    if (index !== -1) {
      const list = [...selectedList2];
      list.splice(index, 1);
      setSelectedList2(list);
    } else {
      setSelectedList2([...selectedList2, data]);
    }
  };

  const transferRightHandler = () => {
    setList2([...list2, ...selectedList1]);
    const newList1 = list1.filter(
      (item) => !selectedList1.some((data) => data.id === item.id)
    );
    setList1(newList1);
    setSelectedList1([]);
  };
  const transferLeftHandler = () => {
    setList1([...list1, ...selectedList2]);
    const newList2 = list2.filter(
      (item) => !selectedList2.some((data) => data.id === item.id)
    );
    setList2(newList2);
    setSelectedList2([]);
  };

  return (
    <div
      style={{
        width: "600px",
        height: "400px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "100px",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          width: "250px",
          height: "100%",
          border: "1px solid black",
          overflowY: "auto",
          padding: "5px",
        }}
      >
        {list1.map((item) => (
          <label
            key={item.id}
            style={{
              padding: "10px",
              marginBottom: "5px",
              border: "1px solid black",
              cursor: "pointer",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              onChange={() => list1SelectionHandler(item)}
            />
            {item.label}
          </label>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button style={{ padding: "10px" }} onClick={transferRightHandler}>
          &gt;&gt;
        </button>
        <button style={{ padding: "10px" }} onClick={transferLeftHandler}>
          &lt;&lt;
        </button>
      </div>

      <div
        style={{
          width: "250px",
          height: "100%",
          border: "1px solid black",
          overflowY: "auto",
          padding: "5px",
        }}
      >
        {list2.map((item) => (
          <label
            key={item.id}
            style={{
              padding: "10px",
              marginBottom: "5px",
              border: "1px solid black",
              cursor: "pointer",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              onChange={() => list2SelectionHandler(item)}
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default App;

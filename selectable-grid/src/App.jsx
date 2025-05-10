import { useState } from "react";
import "./App.css";

const SelectableGrid = ({ row, col, selected, handleSelect }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [firstCell, setFirstCell] = useState();

  const handleMouseDown = (cell) => {
    setIsMouseDown(true);
    setFirstCell(cell);
    handleSelect([cell]);
  };

  const handleMouseEnter = (cell) => {
    if (!isMouseDown) return;

    const startCell = firstCell;
    const endCell = cell;

    const row1 = Math.floor((startCell - 1) / col);
    const col1 = (startCell - 1) % col;

    const row2 = Math.floor((endCell - 1) / col);
    const col2 = (endCell - 1) % col;

    const newSelected = [];
    const startRow = Math.min(row1, row2);
    const endRow = Math.max(row1, row2);
    const startCol = Math.min(col1, col2);
    const endCol = Math.max(col1, col2);

    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        newSelected.push(col * i + j + 1);
      }
    }

    handleSelect(newSelected);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${col}, 50px)` }}
      onMouseUp={handleMouseUp}
    >
      {Array.from({ length: row * col })
        .map((_, index) => index + 1)
        .map((cell) => (
          <div
            key={cell}
            className={selected.includes(cell) ? "cell selected" : "cell"}
            onMouseDown={() => handleMouseDown(cell)}
            onMouseEnter={() => handleMouseEnter(cell)}
          >
            {cell}
          </div>
        ))}
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState([8, 9, 10, 13, 14, 15, 18, 19, 20]);

  const handleSelect = (cellList) => {
    setSelected(cellList);
    console.log(cellList);
  };

  return (
    <div>
      <SelectableGrid
        row={6}
        col={5}
        selected={selected}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default App;

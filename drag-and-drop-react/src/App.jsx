import { useState, Fragment } from "react";
import "./App.css";
import trashIcon from "./assets/trash.svg";

const KanbanBoard = ({ boardData, handleChange }) => {
  const [sectionInputNameVisible, setSectionInputNameVisible] = useState(false);
  const [sectionNameInputValue, setSectionNameInputValue] = useState("");
  const [taskCreationSectionId, setTaskCreationSectionId] = useState("");
  const [taskInputValue, setTaskInputValue] = useState("");
  const [dragOverElement, setDragOverElement] = useState();
  const [draggedElement, setDraggedElement] = useState();

  const cancelSectionCreation = () => {
    setSectionInputNameVisible(false);
    setSectionNameInputValue("");
  };

  const handleCreateSection = () => {
    const newBoardData = [
      ...boardData,
      {
        id: `section_${Date.now()}`,
        title: sectionNameInputValue,
        taskList: [],
      },
    ];
    cancelSectionCreation();
    handleChange(newBoardData);
  };

  const createTaskClickHandler = (sectionId) => {
    setTaskCreationSectionId(sectionId);
    setTaskInputValue("");
  };

  const saveTaskHandler = (sectionId) => {
    setTaskCreationSectionId("");
    setTaskInputValue("");
    const sectionList = [...boardData];
    const section = sectionList.find((section) => section.id === sectionId);
    if (section) {
      section.taskList.push({
        id: `task_${Date.now()}`,
        detail: taskInputValue,
        parentId: section.id,
      });
    }
    handleChange(sectionList);
  };

  const handleDrag = (sectionId, taskIndex) => {
    const sectionList = [...boardData];
    const section = sectionList.find((section) => section.id === sectionId);
    if (section) {
      setDraggedElement({
        originalIndex: taskIndex,
        task: section.taskList[taskIndex],
      });
      section.taskList.splice(taskIndex, 1);
    }
    handleChange(sectionList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const sectionId = e.target.dataset.sectionId;
    const taskIndex = e.target.dataset.taskIndex;

    if (sectionId) {
      setDragOverElement({
        sectionId,
        taskIndex: taskIndex ? Number(taskIndex) : null,
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const sectionList = [...boardData];

    if (!e.target.dataset.sectionId) {
      const section = sectionList.find(
        (section) => section.id === draggedElement.task.parentId
      );

      section.taskList.splice(
        draggedElement.originalIndex,
        0,
        draggedElement.task
      );
    } else {
      if (!e.target.dataset.taskIndex) {
        const section = sectionList.find(
          (section) => section.id === e.target.dataset.sectionId
        );
        section.taskList.splice(0, 0, draggedElement.task);
      } else {
        const section = sectionList.find(
          (section) => section.id === e.target.dataset.sectionId
        );
        section.taskList.splice(
          Number(e.target.dataset.taskIndex) + 1,
          0,
          draggedElement.task
        );
      }
    }
    setDragOverElement();
    handleChange(sectionList);
  };

  const deleteSection = (sectionIndex) => {
    const sectionList = [...boardData];
    sectionList.splice(sectionIndex, 1);
    handleChange(sectionList);
  };

  const deleteTask = (sectionIndex, taskIndex) => {
    const sectionList = [...boardData];
    const taskList = sectionList[sectionIndex].taskList;
    taskList.splice(taskIndex, 1);
    handleChange(sectionList);
  };

  return (
    <div className="board" onDrop={handleDrop} onDragOver={handleDragOver}>
      {boardData.map((section, sectionIndex) => (
        <div key={section.id} className="section">
          <div className="section_header">
            <h3>{section.title}</h3>
            <button onClick={() => deleteSection(sectionIndex)}>
              <img className="section_delete" src={trashIcon} />
            </button>
          </div>

          <div
            data-section-id={section.id}
            className={
              dragOverElement &&
              dragOverElement.sectionId === section.id &&
              dragOverElement.taskIndex === null
                ? "task_slot_active"
                : "task_slot"
            }
          ></div>
          <div className="task_container">
            {section.taskList.map((task, taskIndex) => (
              <Fragment key={task.id}>
                <div
                  className="task"
                  draggable
                  onDrag={() => handleDrag(section.id, taskIndex)}
                >
                  {task.detail}
                  <button onClick={() => deleteTask(sectionIndex, taskIndex)}>
                    <img src={trashIcon} />
                  </button>
                </div>
                <div
                  data-section-id={section.id}
                  data-task-index={taskIndex}
                  className={
                    dragOverElement &&
                    dragOverElement.sectionId === section.id &&
                    dragOverElement.taskIndex === taskIndex
                      ? "task_slot_active"
                      : "task_slot"
                  }
                ></div>
              </Fragment>
            ))}
          </div>
          {taskCreationSectionId === section.id ? (
            <div className="create_task">
              <textarea
                autoFocus
                placeholder="Enter Task Details"
                value={taskInputValue}
                onChange={(e) => setTaskInputValue(e.target.value)}
              />
              <button onClick={() => saveTaskHandler(section.id)}>
                Create
              </button>
            </div>
          ) : (
            <button
              className="create_task_button"
              onClick={() => createTaskClickHandler(section.id)}
            >
              + Create Task
            </button>
          )}
        </div>
      ))}
      <div className="section">
        {!sectionInputNameVisible ? (
          <button
            className="create_section_btn"
            onClick={() => setSectionInputNameVisible(true)}
          >
            + Create Section
          </button>
        ) : (
          <div className="create_section_input">
            <input
              autoFocus
              placeholder="Enter section name"
              value={sectionNameInputValue}
              onChange={(e) => setSectionNameInputValue(e.target.value)}
            />
            <button onClick={handleCreateSection}>Save</button>
            <button onClick={cancelSectionCreation}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [boardData, setBoardData] = useState([
    {
      id: "section_1",
      title: "Todos",
      taskList: [
        { id: "task_11", detail: "task 11", parentId: "section_1" },
        { id: "task_12", detail: "task 12", parentId: "section_1" },
        { id: "task_13", detail: "task 13", parentId: "section_1" },
      ],
    },
    {
      id: "section_2",
      title: "In Progress",
      taskList: [
        { id: "task_21", detail: "task 21", parentId: "section_2" },
        { id: "task_22", detail: "task 22", parentId: "section_2" },
        { id: "task_23", detail: "task 23", parentId: "section_2" },
        { id: "task_24", detail: "task 24", parentId: "section_2" },
      ],
    },
    {
      id: "section_3",
      title: "Done",
      taskList: [
        { id: "task_31", detail: "task 31", parentId: "section_3" },
        { id: "task_32", detail: "task 32", parentId: "section_3" },
      ],
    },
  ]);

  const handleChange = (data) => {
    setBoardData(data);
  };

  return (
    <div className="app">
      <KanbanBoard boardData={boardData} handleChange={handleChange} />
    </div>
  );
};

export default App;

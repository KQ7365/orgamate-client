import { useEffect, useState } from "react";
import { postNewTaskItem } from "../services/postNewTaskItem.jsx";
import { getAllPriorityLabels } from "../services/getAllPriorityLabels.jsx";
import { deleteTaskItem } from "../services/deleteTaskItem.jsx";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const Home = ({ tasks, fetchTasks, showAll }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allPriorityLabels, setAllPriorityLabels] = useState([
    {
      id: 0,
      label: "",
    },
  ]);
  const [newTask, setNewTask] = useState({
    task_item: "",
    note: "",
    priority: 0,
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    fetchTasks(showAll);

    getAllPriorityLabels().then((priorityObj) => {
      setAllPriorityLabels(priorityObj);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll]);

  //*Below handles all of the Create New Task functionality
  const handleNewTaskInput = (e) => {
    const newTaskCopy = { ...newTask };
    newTaskCopy[e.target.name] = e.target.value;
    setNewTask(newTaskCopy);
  };

  const handleSaveNewTask = (e) => {
    e.preventDefault();

    const newTaskItemInputField = {
      task_item: newTask.task_item,
      note: newTask.note,
      priority: newTask.priority,
    };

    postNewTaskItem(newTaskItemInputField)
      .then(() => {
        fetchTasks(showAll);
      })
      .then(() => {
        setNewTask({
          task_item: "",
          note: "",
          priority: 0,
        });
      });
  };

  const handleDeleteTask = (taskId) => {
    deleteTaskItem(taskId).then(fetchTasks);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>
        <img src="orgamate.png" alt="Orgamate Logo" />
      </h1>

      <h2 className="text-center text-3xl font-bold mb-4">All Tasks</h2>

      <div className="mb-4">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="border border-black rounded p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold">Task: {task.task_item}</h2>
            <p>Note: {task.note} </p>
            <p>Priority Level: {task.priority.label}</p>
            <p>Date Added: {task.date_added}</p>
          </div>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="btn bg-red-500 border-2 border-red-600 rounded-md p-2 font-semibold"
          >
            <span className="font-bold text-white">Delete</span>
          </button>
        </div>
      ))}

      <div className="fixed top-1/3 right-12 p-6 border-2 border-black rounded-lg transform -translate-y-1/3 bg-white">
        <h1 className="text-xl font-bold text-center mb-4">Create new task</h1>
        <form>
          <label className="block mb-2">
            Task Item:
            <input
              autoComplete="off"
              value={newTask.task_item}
              type="text"
              name="task_item"
              placeholder="Add text"
              className="mt-2 border-2 border-black rounded-md p-3 block w-full"
              onChange={handleNewTaskInput}
            />
          </label>
          <label className="block mb-2">
            Note:
            <input
              autoComplete="off"
              value={newTask.note}
              type="text"
              name="note"
              placeholder="Add text"
              className="mt-2 border-2 border-black rounded-md p-3 block w-full"
              onChange={handleNewTaskInput}
            />
          </label>
          <select
            onChange={handleNewTaskInput}
            name="priority"
            value={newTask.priority}
            className="mt-2 py-2 px-4 border-2 border-black rounded-md block w-full"
          >
            <option value="0">Select a priority level</option>
            {allPriorityLabels.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleSaveNewTask}
            className="btn mt-4 bg-black border-2 border-white rounded-md p-3 block w-full font-semibold text-white"
          >
            <span className="font-bold">Add to list</span>
          </button>
        </form>
      </div>
    </div>
  );
};

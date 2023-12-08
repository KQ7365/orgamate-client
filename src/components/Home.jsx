import { useEffect } from "react";

export const Home = ({ tasks, fetchTasks, showAll }) => {
  useEffect(() => {
    fetchTasks(showAll);
  }, [showAll]);

  return (
    <div className="flex-direction: column bg-slate-400">
      <h1 className="display: text-center">All Tasks</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h2>Task: {task.task_item}</h2>
          <p>Note: {task.note} </p>
          <p>Priority Level: {task.priority.label}</p>
        </div>
      ))}
    </div>
  );
};

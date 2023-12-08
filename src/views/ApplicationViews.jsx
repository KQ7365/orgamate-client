import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/Login";
import { RegisterAccount } from "../components/RegisterAccount";
import { Home } from "../components/Home";
import { Authorized } from "../components/Authorized";

export const ApplicationViews = () => {
  //   const [itemState, setItemState] = useState();
  const [taskState, setTaskState] = useState([]);

  //   const fetchItemsFromApi = async (showAll) => {
  //     let url = "http://localhost:8000/items";

  //     if (showAll !== true) {
  //       url = "http://localhost:8000/items?owner=current";
  //     }
  //     const response = await fetch(url, {
  //       headers: {
  //         Authorization: `Token ${
  //           JSON.parse(localStorage.getItem("orgamate_token")).token
  //         }`,
  //       },
  //     });
  //     const items = await response.json();
  //     setItemState(items);
  //   };

  const fetchTasksFromApi = async (showAll) => {
    let url = "http://localhost:8000/tasks";

    if (showAll !== true) {
      url = "http://localhost:8000/tasks?owner=current";
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("orgamate_token")).token
        }`,
      },
    });
    const tasks = await response.json();
    setTaskState(tasks);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAccount />} />
      <Route element={<Authorized />}>
        <Route
          path="/"
          element={
            <Home
              tasks={taskState}
              fetchTasks={fetchTasksFromApi}
              showAll={true}
            />
          }
        />
      </Route>
    </Routes>
  );
};

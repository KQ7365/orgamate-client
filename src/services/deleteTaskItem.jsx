export const deleteTaskItem = (itemId) => {
  return fetch(`http://localhost:8000/tasks/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("orgamate_token")).token
      }`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    })
    .catch((error) => {
      console.error("Error in deleteTaskItem:", error);
      throw error;
    });
};

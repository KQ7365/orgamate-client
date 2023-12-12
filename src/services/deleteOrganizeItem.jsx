export const deleteOrganizeItem = (itemId) => {
  return fetch(`http://localhost:8000/items/${itemId}`, {
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
        throw new Error("Failed to delete item");
      }
    })
    .catch((error) => {
      console.error("Error in deleteOrganizeItem:", error);
      throw error;
    });
};

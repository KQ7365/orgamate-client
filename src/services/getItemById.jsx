export const getItemById = (id) => {
  return fetch(`http://localhost:8000/items/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("orgamate_token")).token
      }`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(`Error fetching item with ID ${id}:`, error);
    });
};

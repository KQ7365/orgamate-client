export const postNewOrganizeItem = (item, selectedTags) => {
  return fetch("http://localhost:8000/items", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("orgamate_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...item, tags: Array.from(selectedTags) }),
  });
};

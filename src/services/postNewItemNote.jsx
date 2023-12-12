export const postNewItemNote = (item) => {
  return fetch("http://localhost:8000/notes", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("orgamate_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

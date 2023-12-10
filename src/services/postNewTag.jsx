export const postNewTag = (item) => {
  return fetch("http://localhost:8000/tags", {
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

export const postNewLocation = (item) => {
  return fetch("http://localhost:8000/locations", {
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

export const getAllTags = async () => {
  try {
    const response = await fetch("http://localhost:8000/tags", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("orgamate_token")).token
        }`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tags");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getAllTags:", error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("orgamate_token")).token
        }`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    throw error;
  }
};

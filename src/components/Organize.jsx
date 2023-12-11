import { useEffect } from "react";
import { deleteOrganizeItem } from "../services/deleteOrganizeItem.jsx";

export const Organize = ({ items, fetchItems, showAll }) => {
  useEffect(() => {
    fetchItems(showAll);
  }, [showAll]);

  const handleDeleteItem = (itemId) => {
    deleteOrganizeItem(itemId).then(fetchItems);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Organize</h1>

      <h1 className="text-center text-3xl font-bold mb-4">All Items</h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="border border-black rounded p-4 mb-4 flex flex-col items-center"
        >
          <div className="mb-4">
            <img
              src={item.image}
              alt="Item Image"
              className="max-w-full h-auto object-cover"
              style={{ maxWidth: "400px", maxHeight: "450px" }}
            />
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
            <p>Category: {item.category.label}</p>
            <p>Location: {item.location.name}</p>
            <p>
              Tags:{" "}
              {item.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-gray-300 rounded-full px-2 py-1 mr-2 mb-2"
                >
                  {tag.label}
                </span>
              ))}
            </p>
          </div>
          <button
            onClick={() => handleDeleteItem(item.id)}
            className="btn bg-red-500 border-2 border-red-600 rounded-md p-2 font-semibold"
          >
            <span className="font-bold text-white">Delete</span>
          </button>
        </div>
      ))}
    </div>
  );
};

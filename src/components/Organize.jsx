import { useEffect, useState } from "react";
import { deleteOrganizeItem } from "../services/deleteOrganizeItem.jsx";
import { getAllCategories } from "../services/getAllCategories.jsx";
import { getAllLocations } from "../services/getAllLocations.jsx";
import { postNewOrganizeItem } from "../services/postNewOrganizeItem.jsx";
import { useNavigate } from "react-router-dom";

export const Organize = ({ items, fetchItems, showAll }) => {
  const [newItem, setNewItem] = useState({
    image: "",
    name: "",
    description: "",
    category: 0,
    location: 0,
  });
  const [allCategories, setAllCategories] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [selectedTags, updateTags] = useState(new Set());
  const [tags, chosenTags] = useState([{}]);

  const navigate = useNavigate();

  //*below handles all fetches of items, categories, and locations
  useEffect(() => {
    fetchItems(showAll);

    getAllCategories().then((catObj) => {
      setAllCategories(catObj);

      getAllLocations().then((locObj) => {
        setAllLocations(locObj);
      });
    });
  }, [showAll]);

  //*below handles saving new item
  const handleSaveNewItem = (e) => {
    e.preventDefault();

    const newItemInputField = {
      image: newItem.image,
      name: newItem.name,
      description: newItem.description,
      category: newItem.category,
      location: newItem.location,
    };

    postNewOrganizeItem(newItemInputField, selectedTags)
      .then(() => {
        fetchItems(showAll);
      })
      .then(() => {
        setNewItem({
          image: "",
          name: "",
          description: "",
          category: 0,
          location: 0,
        });
        updateTags(new Set()); // Resets selectedTags
      });
  };

  //*Below handles anything with tags and our many to many relationship
  const handleTagsChosen = (tag) => {
    const copy = new Set(selectedTags);
    copy.has(tag.id) ? copy.delete(tag.id) : copy.add(tag.id);
    updateTags(copy);
  };

  const fetchTags = async () => {
    const response = await fetch("http://localhost:8000/tags", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("orgamate_token")).token
        }`,
      },
    });
    const tags = await response.json();
    chosenTags(tags);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  //*below handles the delete an individual item
  const handleDeleteItem = (itemId) => {
    deleteOrganizeItem(itemId).then(fetchItems);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Stay Organized</h1>
      <form
        id="form"
        onSubmit={handleSaveNewItem}
        className="bg-white p-6 rounded-md shadow-md flex flex-wrap"
      >
        <h2 className="w-full text-2xl mb-4">Add New Item</h2>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 pr-2">
          <input
            autoComplete="off"
            type="text"
            name="image"
            value={newItem.image}
            onChange={(e) =>
              setNewItem({ ...newItem, [e.target.name]: e.target.value })
            }
            placeholder="Image URL"
            className="border p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 pr-2">
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={newItem.name}
            onChange={(e) =>
              setNewItem({ ...newItem, [e.target.name]: e.target.value })
            }
            placeholder="Item name"
            className="border p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 pr-2">
          <input
            autoComplete="off"
            type="text"
            name="description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, [e.target.name]: e.target.value })
            }
            placeholder="Description"
            className="border p-2 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 pr-2">
          <select
            name="category"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, [e.target.name]: e.target.value })
            }
            className="border p-2 w-full"
          >
            <option value="0">Select a category</option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 pr-2">
          <select
            name="location"
            value={newItem.location}
            onChange={(e) =>
              setNewItem({ ...newItem, [e.target.name]: e.target.value })
            }
            className="border p-2 w-full"
          >
            <option value="0">Select a location</option>
            {allLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mb-4 pr-2">
          <fieldset className="flex flex-wrap items-center">
            <legend className="block font-bold mb-2 w-full">
              Select Tags:
            </legend>
            {tags.map((t) => (
              <div
                key={`tags-${t.id}`}
                className="mb-2 mr-2 p-2 border rounded flex items-center"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.has(t.id)}
                  onChange={() => handleTagsChosen(t)}
                  className="mr-2"
                />
                {t.label}
              </div>
            ))}
          </fieldset>
        </div>

        <div className="w-full flex items-center justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Add New Item
          </button>
        </div>
      </form>

      <h1>All Items</h1>
      <div className="flex flex-wrap justify-center -mx-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-black rounded p-4 mb-4 mx-4 flex flex-col items-center"
            style={{ minWidth: "300px" }} // Set a fixed minimum width
          >
            <div className="mb-4">
              <img
                src={item.image}
                alt="Item Image"
                className="w-full h-40 object-cover mb-4"
                onClick={() => {
                  navigate(`/item_details/${item.id}`);
                }}
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
    </div>
  );
};

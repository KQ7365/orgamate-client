import { useEffect } from "react";
import { useState } from "react";
import { getAllTags } from "../services/getAllTags.jsx";
import { getAllLocations } from "../services/getAllLocations.jsx";
import { getAllCategories } from "../services/getAllCategories.jsx";
import { postNewTag } from "../services/postNewTag.jsx";
import { postNewLocation } from "../services/postNewLocation.jsx";
import { postNewCategory } from "../services/postNewCategory.jsx";

export const Customize = () => {
  const [allTags, setAllTags] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [newTag, setNewTag] = useState({
    label: "",
  });
  const [newLocation, setNewLocation] = useState({
    name: "",
  });
  const [newCategory, setNewCategory] = useState({
    label: "",
  });

  useEffect(() => {
    getAllTags().then((tagObj) => {
      setAllTags(tagObj);

      getAllLocations().then((locationObj) => {
        setAllLocations(locationObj);

        getAllCategories().then((categoryObj) => {
          setAllCategories(categoryObj);
        });
      });
    });
  }, []);

  //*Below handles all of the Create New Tag functionality

  const handleSaveNewTag = (e) => {
    e.preventDefault();

    const newTagInputField = {
      label: newTag.label,
    };

    postNewTag(newTagInputField).then(() => {
      getAllTags()
        .then((tagObj) => {
          setAllTags(tagObj);
        })
        .then(() => {
          setNewTag({
            label: "",
          });
        });
    });
  };

  //*Below handles all of the Create New Location functionality

  const handleSaveNewLocation = (e) => {
    e.preventDefault();

    const newLocationInputField = {
      name: newLocation.name,
    };

    postNewLocation(newLocationInputField).then(() => {
      getAllLocations()
        .then((locObj) => {
          setAllLocations(locObj);
        })
        .then(() => {
          setNewLocation({
            name: "",
          });
        });
    });
  };

  //*Below handles all of the Create New Category functionality

  const handleSaveNewCategory = (e) => {
    e.preventDefault();

    const newLocationInputField = {
      label: newCategory.label,
    };

    postNewCategory(newLocationInputField).then(() => {
      getAllCategories()
        .then((catObj) => {
          setAllCategories(catObj);
        })
        .then(() => {
          setNewCategory({
            label: "",
          });
        });
    });
  };

  return (
    <div className="flex flex-wrap justify-around">
      <div className="w-1/3 p-4">
        <h2 className="text-lg font-semibold mb-4">Locations</h2>
        <form onSubmit={handleSaveNewLocation} className="mb-4">
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={newLocation.name}
            onChange={(e) =>
              setNewLocation({
                ...newLocation,
                [e.target.name]: e.target.value,
              })
            }
            className="border p-2 w-full mb-2"
            placeholder="Create new location"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save
          </button>
        </form>
        <ul>
          {allLocations.map((location) => (
            <li key={location.id}>{location.name}</li>
          ))}
        </ul>
      </div>
      <div className="w-1/3 p-4">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <form onSubmit={handleSaveNewCategory} className="mb-4">
          <input
            autoComplete="off"
            type="text"
            name="label"
            value={newCategory.label}
            onChange={(e) =>
              setNewCategory({
                ...newCategory,
                [e.target.name]: e.target.value,
              })
            }
            className="border p-2 w-full mb-2"
            placeholder="Create new category"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save
          </button>
        </form>
        <ul>
          {allCategories.map((category) => (
            <li key={category.id}>{category.label}</li>
          ))}
        </ul>
      </div>
      <div className="w-1/3 p-4">
        <h2 className="text-lg font-semibold mb-4">Tags</h2>
        <form onSubmit={handleSaveNewTag} className="mb-4">
          <input
            autoComplete="off"
            type="text"
            name="label"
            value={newTag.label}
            onChange={(e) =>
              setNewTag({ ...newTag, [e.target.name]: e.target.value })
            }
            className="border p-2 w-full mb-2"
            placeholder="Create new tag"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save
          </button>
        </form>
        <ul>
          {allTags.map((tag) => (
            <li key={tag.id}>{tag.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

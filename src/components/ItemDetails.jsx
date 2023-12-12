import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../services/getItemById.jsx";
import { postNewItemNote } from "../services/postNewItemNote.jsx";

export const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [itemNote, setItemNote] = useState({
    item: itemId,
    comment: "",
  });
  const [editSingleNote, setEditSingleNote] = useState({});
  const editModal = useRef();

  useEffect(() => {
    getItemById(itemId).then((itemObj) => {
      setItem(itemObj);
    });
  }, [itemId]);

  const handleNoteSave = (e) => {
    e.preventDefault();

    const newItemNote = {
      item: parseInt(itemNote.item),
      comment: itemNote.comment,
    };

    postNewItemNote(newItemNote)
      .then(() => {
        getItemById(itemId).then((noteObj) => {
          setItem(noteObj);
        });
      })
      .then(() => {
        setItemNote({
          item: itemId,
          comment: "",
        });
      });
  };

  //*following handles editing a note

  const editNote = async (event, id) => {
    event.preventDefault();
    const finalValue = {
      comment: editSingleNote.comment,
    };

    await fetch(`http://localhost:8000/notes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("orgamate_token")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalValue),
    });

    const updatedNote = await getItemById(itemId);
    setItem(updatedNote);
    editModal.current.close();
    setItemNote({ comment: "" });
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center -mx-4">
        <img
          className="w-64 h-75 object-cover bg-origin-padding m-3"
          src={item.image}
          alt="Image of item"
        />
        {/* Edit Modal Designated Below*/}
        <dialog
          className="bg-white p-6 border-2 border-black rounded-lg fixed top-1/3 right-12 transform -translate-y-1/3"
          ref={editModal}
        >
          <button
            className="text-xl absolute top-2 right-2 cursor-pointer hover:text-red-500"
            onClick={() => editModal.current.close()}
            //This handles the X button (close button)
          >
            X
          </button>
          <h1 className="text-xl font-bold text-center mb-4">Edit this note</h1>
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={(event) => {
              event.preventDefault();
              // This prevents issues with the form when hitting cancel
            }}
          >
            <label>
              <input
                className="mt-2 border-2 border-black rounded-md p-3 block w-full"
                value={editSingleNote.comment || ""}
                onChange={(event) => {
                  const copy = { ...editSingleNote };
                  copy.comment = event.target.value;
                  setEditSingleNote(copy);
                  //handles the INPUT field of the edited item. The reason I have a || "" (or empty string) is to handle the value never being undefined
                }}
              />
            </label>

            <div className="w-full">
              <button
                className="btn mt-4 bg-green-200 border-2 border-green-300 rounded-md p-3 w-full font-semibold hover:bg-green-300"
                onClick={(event) => {
                  editNote(event, editSingleNote.id);
                }}
                //handles the Ok button after editing
              >
                Ok
              </button>
              <button
                className="btn bg-red-200 border-2 border-red-300 rounded-md p-3 w-full mt-2 font-semibold hover:bg-red-300"
                onClick={() => editModal.current.close()}
                //handles the cancel button
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
        <div className="border border-black rounded p-4 mb-4 mx-4 flex flex-col items-center">
          <p>Item: {item.name}</p>
          <h2>
            <u>Notes for this item</u>
          </h2>
          {item.noteItemId?.map((note) => {
            return (
              <div key={note.id}>
                <h2>{note.comment}</h2>
                <button
                  onClick={() => {
                    setEditSingleNote(note);
                    editModal.current.showModal();
                    //handles when you click the edit button/gear symbol. It then "activates" all the JSX code above.
                  }}
                  className="edit_btn basis-7"
                >
                  <i className="fa-solid fa-gear"></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <form onSubmit={handleNoteSave} className="w-full max-w-md mx-auto my-4">
        <div className="flex items-center border-b border-black-500 py-2">
          <textarea
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Add a new note..."
            value={itemNote.comment}
            onChange={(e) =>
              setItemNote({ ...itemNote, comment: e.target.value })
            }
          />
          <button
            className="flex-shrink-0 bg-black hover:bg-gray-800 border-black hover:border-gray-800 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

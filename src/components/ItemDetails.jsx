import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../services/getItemById.jsx";
import { postNewItemNote } from "../services/postNewItemNote.jsx";

export const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState({ item_note: [] });
  const [itemNote, setItemNote] = useState({
    item: itemId,
    comment: "",
  });

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

  return (
    <div>
      <div className="flex items-center justify-center">
        <img
          className="w-64 h-75 object-cover bg-origin-padding m-3"
          src={item.image}
          alt="Image of item"
        />
        <h2>
          <u> Item Notes</u>
          {item.item_note?.map((note) => (
            <li key={note.id}>{note.comment}</li>
          ))}
        </h2>
      </div>
      <form></form>
    </div>
  );
};
//TODO:Need to build out adding the note. Doing inline JSX input change again

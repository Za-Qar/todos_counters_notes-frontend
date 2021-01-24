import React, { useState, useRef, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { motion } from "framer-motion";
import "./notes.css";
import { BACKEND_URLS } from "../../configs/configs";

import Note from "../note";

// Encryption
import CryptoJS from "react-native-crypto-js";

function Notes() {
  const area = useRef(null);
  const [titleInput, setTitleInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [note, setNote] = useState([]);

  const [retrieveAllNote, setRetrieveAllNotes] = useState([]);

  const [getNewNoteId, setNewNoteId] = useState(0);

  const [colour, setColour] = useState("whiteNote");

  /*---------------Add Note----------------*/
  let postNote = (title, text, colour) => {
    // Encrypt
    const encryptedTitle = CryptoJS.AES.encrypt(
      `${title}`,
      `${process.env.ENCRYPTION_HASH}`
    ).toString();

    // Encrypt
    const encryptedText = CryptoJS.AES.encrypt(
      `${text}`,
      `${process.env.ENCRYPTION_HASH}`
    ).toString();

    // Encrypt
    const encryptedColour = CryptoJS.AES.encrypt(
      `${colour}`,
      `${process.env.ENCRYPTION_HASH}`
    ).toString();

    fetch(`${BACKEND_URLS.NOTES}`, {
      method: "POST",
      body: JSON.stringify({
        title: encryptedTitle,
        text: encryptedText,
        colour: encryptedColour,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setNewNoteId(data[0].id))
      .catch((error) => console.log("Notes error: ", error));
  };

  /*---------------Retrieve all notes----------------*/
  async function retrieveAllNotes() {
    let res = await fetch(`${BACKEND_URLS.NOTES}`);
    let data = await res.json();

    const decrypting = data.payload.map((item) => {
      // Decrypt
      const decryptingColour = CryptoJS.AES.decrypt(
        `${item.color}`,
        `${process.env.ENCRYPTION_HASH}`
      );
      const decryptedColour = decryptingColour.toString(CryptoJS.enc.Utf8);

      // Decrypt
      const decryptingText = CryptoJS.AES.decrypt(
        `${item.text}`,
        `${process.env.ENCRYPTION_HASH}`
      );
      const decryptedText = decryptingText.toString(CryptoJS.enc.Utf8);

      // Decrypt
      const decryptingTitle = CryptoJS.AES.decrypt(
        `${item.title}`,
        `${process.env.ENCRYPTION_HASH}`
      );
      const decryptedTitle = decryptingTitle.toString(CryptoJS.enc.Utf8);

      return {
        color: decryptedColour,
        id: item.id,
        text: decryptedText,
        title: decryptedTitle,
        status: item.status,
      };
    });

    console.log("these are all the notes on the database: ", data.payload);
    setRetrieveAllNotes(decrypting);
  }

  useEffect(() => {
    retrieveAllNotes();
  }, []);

  /*---------------Delete note----------------*/
  let deleteNoteBackend = (id) => {
    fetch(`${BACKEND_URLS.NOTES}/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "Note has been delete buddy boy"))
      .catch((error) => console.log(error, "this is the delete note error"));
  };

  /*--------------------Notes backend end----------------------*/

  async function addNote() {
    let newNotes = [
      ...note,
      { title: titleInput, text: textInput, colour: colour },
    ];
    setNote(newNotes);
    postNote(titleInput, textInput, colour);
  }

  function deleteNote(id, noteId) {
    confirmAlert({
      title: "Are you sure you want to delete this notes?",
      message: "This action is irreversible",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            let newNotes = [...note.slice(0, id), ...note.slice(id + 1)];
            setNote(newNotes);

            deleteNoteBackend(noteId);
            retrieveAllNotes();
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  }

  return (
    <div className="container">
      <div className="notesSec">
        <div className="notesInput">
          <input
            placeholder="Title"
            className="inputFieldNotesLeft"
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <input
            placeholder="Text"
            className="inputFieldNotesRight"
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>
        <button className="addNoteButton" onClick={addNote}>
          Add Note
        </button>
        <div class="colour">
          <h4>Choose a colour</h4>
          <span class="column in1">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("whiteNote")}
            />
          </span>
          <span class="column in2">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("greenNote")}
            />
          </span>
          <span class="column in3">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("redNote")}
            />
          </span>
          <span class="column in4">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("purpleNote")}
            />
          </span>
          <span class="column in5">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("peachNote")}
            />
          </span>

          <span class="column in6">
            <input
              class="allColumns"
              name="colour"
              type="radio"
              onChange={() => setColour("blueNote")}
            />
          </span>
        </div>
        <motion.div className="drag-area" ref={area}>
          {retrieveAllNote.map((item, index) => {
            return (
              <Note
                area={area}
                noteTitle={item.title}
                noteText={item.text}
                index={index}
                deleteNote={deleteNote}
                noteId={item.id}
                key={index}
                colour={item.color}
              />
            );
          })}
          {/*noteText={noteText}*/}
          {note.map((item, index) => {
            return (
              <Note
                area={area}
                noteTitle={item.title}
                noteText={item.text}
                index={index}
                deleteNote={deleteNote}
                noteId={getNewNoteId}
                key={index}
                colour={item.colour}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default Notes;

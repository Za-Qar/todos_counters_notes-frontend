import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./notes.css";

import Note from "../note";

function Notes() {
  const area = useRef(null);
  const [titleInput, setTitleInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [note, setNote] = useState([]);

  const [retrieveAllNote, setRetrieveAllNotes] = useState([]);

  const [getNotesMaxId, setGetNotesMaxId] = useState(0);

  const [colour, setColour] = useState("whiteNote");

  /*---------------Add Note----------------*/
  let postNote = (title, text) => {
    console.log("counter Input recieved", title, text);
    fetch(`http://localhost:5000/note`, {
      method: "POST",
      body: JSON.stringify({ title: title, text: text }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "here's the note data buddy boy"))
      .catch((error) => console.log(error, "counter error"));
  };

  /*---------------Get max note id----------------*/
  async function noteMaxId() {
    let res = await fetch("http://localhost:5000/note/getMaxNoteId");
    let data = await res.json();
    let id = data.payload[0].id;
    return id;
  }

  /*---------------Retrieve all notes----------------*/
  async function retrieveAllNotes() {
    let res = await fetch("http://localhost:5000/note");
    let data = await res.json();
    console.log("these are all the notes on the database: ", data.payload);
    setRetrieveAllNotes(data.payload);
  }

  useEffect(() => {
    retrieveAllNotes();
  }, []);

  /*---------------Delete note----------------*/
  let deleteNoteBackend = (id) => {
    fetch(`http://localhost:5000/note/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data, "Note has been delete buddy boy"))
      .catch((error) => console.log(error, "this is the delete note error"));
  };

  /*--------------------Notes backend end----------------------*/

  async function addNote() {
    let newNotes = [...note, { title: titleInput, text: textInput }];
    setNote(newNotes);
    postNote(titleInput, textInput);

    let maxNotesId = await noteMaxId();
    setGetNotesMaxId(maxNotesId);
    console.log(
      "this is the noteMaxId that I get from the fetch: ",
      maxNotesId
    );
  }

  function deleteNote(id, noteId) {
    console.log(note);
    let newNotes = [...note.slice(0, id), ...note.slice(id + 1)];
    setNote(newNotes);

    console.log(
      "this is noteId that is passed down from the getAll and getMaxId: ",
      noteId
    );
    deleteNoteBackend(noteId);
    retrieveAllNotes();
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
        <motion.div className="drag-area" ref={area}>
          {note.map((item, index) => {
            return (
              <Note
                area={area}
                noteTitle={item.title}
                noteText={item.text}
                index={index}
                deleteNote={deleteNote}
                noteId={getNotesMaxId}
                key={index}
                colour={colour}
              />
            );
          })}
          {/*noteText={noteText}*/}
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
                colour={colour}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default Notes;

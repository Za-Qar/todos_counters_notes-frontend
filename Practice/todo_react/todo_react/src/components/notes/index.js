import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./notes.css";

import Note from "../note";

function Notes() {
  const area = useRef(null);
  const [titleInput, setTitleInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [note, setNote] = useState([]);

  function addNote() {
    console.log(note);
    let newNoteTitle = [...note, { title: titleInput, text: textInput }];
    setNote(newNoteTitle);
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
          {note.map((item) => {
            return (
              <Note area={area} noteTitle={item.title} noteText={item.text} />
            );
          })}
          {/*noteText={noteText}*/}
        </motion.div>
      </div>
    </div>
  );
}

export default Notes;

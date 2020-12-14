import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./notes.css";

import Note from "../note";

function Notes() {
  const area = useRef(null);
  const [noteTitle, setNoteTitle] = useState("hello");
  const [noteText, setNoteText] = useState("hello");

  return (
    <div className="container">
      <div className="notesSec">
        <div className="notesInput">
          <input
            placeholder="Title"
            className="inputFieldNotesLeft"
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <input placeholder="Text" className="inputFieldNotesRight" />
        </div>
        <button className="addNoteButton">Add Note</button>
        <motion.div className="drag-area" ref={area}>
          <Note area={area} noteTitle={noteTitle} />
        </motion.div>
      </div>
    </div>
  );
}

export default Notes;

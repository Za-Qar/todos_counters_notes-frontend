import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./notes.css";

import Note from "../note";

function Notes() {
  const area = useRef(null);
  const [note, setNote] = useState("hello");

  return (
    <div className="container">
      <div className="notesSec">
        <div className="notesInput">
          <input
            className="inputFieldNotesLeft"
            onChange={(e) => setNote(e.target.value)}
          />
          <input className="inputFieldNotesRight" />
        </div>
        <button className="addNoteButton">Add Note</button>
        <motion.div className="drag-area" ref={area}>
          <Note area={area} note={note} />
        </motion.div>
      </div>
    </div>
  );
}

export default Notes;

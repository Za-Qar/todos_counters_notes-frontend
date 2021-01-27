import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./note.css";

function Note({
  area,
  noteTitle,
  noteText,
  index,
  deleteNote,
  noteId,
  colour,
  hide,
}) {
  //   const [note, setNote] = useState("");

  return (
    <div className={`${hide}`}>
      <motion.div
        class={`note ${colour}`}
        drag
        dragConstraints={area}
        dragElastic={0.05}
        dragMomentum={false}
        whileHover={{ scale: 1.2 }}
        // animate={{ rotate: 360 }}
        transition={{ duration: 2 }}
        onMouseUp={(e) =>
          console.log({ taget: e.target.getBoundingClientRect() })
        }
        // whileTap={{ rotate: 90 }}
      >
        <p className="noteTitle">{noteTitle}</p>
        <p className="noteText">{noteText}</p>

        <img
          className={`todoDelete`}
          onClick={() => {
            deleteNote(index, noteId);
            console.log(noteId);
          }}
          src="https://i.imgur.com/z4KpjzC.png"
          alt="delete"
        />
      </motion.div>
    </div>
  );
}

export default Note;

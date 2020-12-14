import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./note.css";

function Note(area, { noteTitle }) {
  //   const [note, setNote] = useState("");

  function log() {
    console.log(noteTitle);
  }

  return (
    <motion.div
      class="note"
      drag
      dragConstraints={area}
      dragElastic={0.05}
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2 }}
      onMouseUp={(e) =>
        console.log({ taget: e.target.getBoundingClientRect() })
      }
      // whileTap={{ rotate: 90 }}
    >
      <p>What if I have some text here?</p>
      <p>{noteTitle}</p>
      <button onClick={log}>Click me</button>
    </motion.div>
  );
}

export default Note;

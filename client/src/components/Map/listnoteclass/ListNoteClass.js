import React, { useState } from "react";
import { useSelector } from "react-redux";

import LiListNoteClass from "../lilistnoteclass/LiListNoteClass";
import "./styles.scss";

function ListNoteClass() {
  const [visibilityUl, setInvisibilityUl] = useState(true);

  // class được note
  const classListNote = useSelector((state) => state.classList.arrayClassNote);

  return (
    <div className="wrapper_list_note_class">
      {classListNote.length > 0 && (
        <h2 onClick={() => setInvisibilityUl(!visibilityUl)}>Chú giải</h2>
      )}

      {visibilityUl && (
        <ul className="ul_list_note">
          <LiListNoteClass classListNote={classListNote} />
        </ul>
      )}
    </div>
  );
}

export default ListNoteClass;

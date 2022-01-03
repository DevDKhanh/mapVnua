import React from "react";
import "./styles.scss";

function LiListNoteClass({ classListNote }) {
  return (
    <>
      {classListNote.map((item, index) => (
        <li key={index} className="li_item_note">
          {item}
        </li>
      ))}
    </>
  );
}

export default LiListNoteClass;

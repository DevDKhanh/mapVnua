import React from "react";
import "./styles.scss";

function LiListFirstClass({ onClick, textClass }) {
  return (
    <li onClick={onClick} className="li_list_class_first">
      <p>{textClass}</p>
    </li>
  );
}

export default LiListFirstClass;

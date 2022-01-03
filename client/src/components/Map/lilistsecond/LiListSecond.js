import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Thư mục
import "./styles.scss";
import {
  addCLassListNote,
  removedClassListNote,
} from "../../../redux/action/actionClassList";

function LiListSecond({ item, isChecked, setIsChecked }) {
  const dispatch = useDispatch();
  const arrayClassNote = useSelector((state) => state.classList.arrayClassNote);

  const handleOnclickClass = (item) => {
    //checked checkbox
    if (arrayClassNote.includes(item)) {
      dispatch(removedClassListNote(item));
    } else {
      dispatch(addCLassListNote(item));
    }

    setIsChecked(!isChecked);
  };

  return (
    <li className="Li_List_Second">
      <label onClick={() => handleOnclickClass(item)}>{item}</label>
      <div onClick={() => handleOnclickClass(item)}>
        <input type={"checkbox"} checked={isChecked} onChange={(e) => {}} />
      </div>
    </li>
  );
}

export default LiListSecond;

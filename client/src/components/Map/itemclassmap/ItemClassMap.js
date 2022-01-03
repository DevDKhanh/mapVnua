import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./styles.scss";
import LiListSecond from "../lilistsecond/LiListSecond";

function ItemClassMap({ isVisibility, arrayText }) {
  //trạng thái checkbox
  const [isChecked, setIsChecked] = useState(false);

  const arrayClassNote = useSelector((state) => state.classList.arrayClassNote);

  return (
    <ul
      style={isVisibility ? { contentVisibility: "visible" } : {}}
      className="ul_list_itemClass"
    >
      {arrayText.map((item, index) => (
        <LiListSecond
          key={index}
          item={item}
          isChecked={arrayClassNote.includes(item)}
          setIsChecked={setIsChecked}
        />
      ))}
    </ul>
  );
}

export default ItemClassMap;

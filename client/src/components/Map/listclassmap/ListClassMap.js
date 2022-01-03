import React, { useEffect, useRef, useState } from "react";
import ListLiClass from "../listliclass/ListLiClass";
import "./styles.scss";

function ListClassMap({ arrayTextClassFirst, arrayTextClassSecond }) {
  return (
    <ul className="ul_list">
      {arrayTextClassFirst.map((item, index) => (
        <ListLiClass
          index={index}
          key={index}
          item={item}
          arrayTextClassSecond={arrayTextClassSecond}
        />
      ))}
    </ul>
  );
}

export default ListClassMap;

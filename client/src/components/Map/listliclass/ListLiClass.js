import React, { useRef, useState } from "react";

import ItemClassMap from "../itemclassmap/ItemClassMap";
import LiListFirstClass from "../lilistfirstclass/LiListFirstClass";
import "./styles.scss";

function ListLiClass({ index, item, arrayTextClassSecond }) {
  const [isVisibility, setIsVisibility] = useState(false);

  // Sự kiện xử lý ẩn hiện li lớp 2
  const handleVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  return (
    <div className="wrapperItem">
      <LiListFirstClass onClick={handleVisibility} textClass={item} />
      <ItemClassMap
        isVisibility={isVisibility}
        arrayText={arrayTextClassSecond[index]}
      />
    </div>
  );
}

export default ListLiClass;

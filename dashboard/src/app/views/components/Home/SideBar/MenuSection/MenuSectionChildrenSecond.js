import React from "react";
import { useDispatch } from "react-redux";

// Thư mục
import styles from "./MenuSection.module.scss";
import { reqDisplay } from "../../../../../redux/action/action.componentDisplay";

function MenuSectionChildrenSecond({ children }) {
  const dispatch = useDispatch();

  const handleComponent = (item) => {
    switch (item) {
      case "Khu vực":
        dispatch(reqDisplay({ text: item, data: `datatable ${item}` }));
        break;
      case "Phân loại":
        dispatch(reqDisplay({ text: item, data: `datatable ${item}` }));
        break;
      case "Lớp":
        dispatch(reqDisplay({ text: item, data: `datatable ${item}` }));
        break;
      case "Tài liệu":
        dispatch(reqDisplay({ text: item, data: `datatable ${item}` }));
        break;
      case "Cấu hình":
        dispatch(reqDisplay({ text: item, data: `datatable ${item}` }));
        break;
      case "Giao diện":
        dispatch(reqDisplay({ text: item, data: `datatable ${item}` }));
        break;
      case "Ngôn ngữ":
        dispatch(reqDisplay({ text: item, data: `datatable ${item}` }));
        break;
      case "Tài khoản":
        dispatch(reqDisplay({ text: item, data: `datatable ${item}` }));
        break;
    }
  };

  return (
    <div className={styles.wrapper_children_second}>
      {children.map((item, index) => (
        <p onClick={() => handleComponent(item)} key={index}>
          {item}
        </p>
      ))}
    </div>
  );
}

export default MenuSectionChildrenSecond;

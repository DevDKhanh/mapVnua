import React, { useState } from "react";
import { useSelector } from "react-redux";

//Thư mục
import styles from "./MainContent.module.scss";
import PanelMainContent from "../../Panel/PanelMainContent";
import HeaderNavBar from "./Header/HeaderNavBar";

function MainContent() {
  const [isVisible, setIsVisible] = useState(false);

  //value được click
  const dataDisplayComponent = useSelector((state) => state.displayMainContent);

  //Dữ liệu đầu bảng
  const datahead = [
    "ID",
    "Tên khu vực",
    "Tọa độ lat",
    "Tọa độ lng",
    "Zoom",
    "Tên ngôn ngữ",
    "Hiển thị",
    "Hành động",
  ];

  return (
    <div className={styles.wrapper_mainContent}>
      <HeaderNavBar
        text={dataDisplayComponent.textComponentDisplay}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <div
        className={styles.wapper_panelTitle}
        onClick={() => setIsVisible(false)}
      >
        <button>Tạo mới</button>
        <PanelMainContent thead={datahead} />
      </div>
    </div>
  );
}

export default MainContent;

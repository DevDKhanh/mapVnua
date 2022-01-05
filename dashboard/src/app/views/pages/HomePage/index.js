import React from "react";

//Thư mục
import styles from "./HomePage.module.scss";

//Component
import SideBar from "../../components/Home/SideBar/SideBar";
import MainContent from "../../components/Home/MainContent/MainContent";

function HomePage() {
  return (
    <div className={styles.container}>
      <SideBar />
      <MainContent />
    </div>
  );
}

export default HomePage;

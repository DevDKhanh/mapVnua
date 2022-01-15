import React, { useState } from "react";

//path of folder
import styles from "./SeeDataiPage.module.scss";
import SeeDetail from "../../../components/DetailForm/SeeDetail";

import img from "../../../../images/admin.png";

function SeeDetailPage() {
  return (
    <div className={styles.container}>
      {/* Dữ liệu đang fix cứng */}
      <SeeDetail
        objectDataItem={{
          Tên: "Nguyễn Đức Minh",
          Lớp: "0913245667",
          Addr: "Bắc Ninh",
          Hobby: "Coding ",
          icon: img,
        }}
      />
    </div>
  );
}

export default SeeDetailPage;

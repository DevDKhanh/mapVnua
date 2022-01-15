import React, { useState } from "react";
import { useParams } from "react-router-dom";

// path of folder
import styles from "./EditPage.module.scss";
import HeaderNavBar from "../../../components/Home/MainContent/Header/HeaderNavBar";
import EditForm from "../../../components/EditForm/EditForm";

function EditPage() {
  // state visible of logout bar
  const [isVisible, setIsVisible] = useState(false);

  const { name } = useParams();

  // Đang fix cứng dữ liệu của item
  const dataItem = {
    STT: 1,
    TuKhoa: "New_key",
    TenNgonNgu: "language",
    Dich: "No",
  };

  return (
    <div className={styles.container}>
      <EditForm paramName={name} setIsVisible={setIsVisible} data={dataItem} />
    </div>
  );
}

export default EditPage;

import React, { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

// Path of folder
import styles from "./NewCreatePage.module.scss";
import NewCreateForm from "../../../components/newCreateForm";

function NewCreatePage() {
  // dataDisplayComponent.textComponentDisplay
  const { name } = useParams();

  //get context from parent
  const setIsVisible = useOutletContext();

  return (
    <div className={styles.container} onClick={() => setIsVisible(false)}>
      <NewCreateForm paramName={name} />
    </div>
  );
}

export default NewCreatePage;

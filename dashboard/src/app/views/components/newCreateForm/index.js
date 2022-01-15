import React from "react";

// path of folder
import styles from "./form.module.scss";
import CreateNewLanguage from "./LanguageForm";
import CreateNewRegion from "./RegionForm";
import CreateNewClassify from "./ClassifyForm";
import CreateNewConfig from "./ConfigForm";
import CreateNewInterface from "./InterfaceForm";
import CreateNewAccount from "./AccountForm";
import CreateNewClass from "./ClassForm";

// paramName = name on param of url bar
function NewCreateForm({ paramName }) {
  return (
    <div className={styles.wrapper_main_form}>
      {/* content of main */}
      {paramName === "language" && (
        <CreateNewLanguage text="Tạo mới" paramName={paramName} />
      )}
      {paramName === "area" && (
        <CreateNewRegion text="Tạo mới" paramName={paramName} />
      )}
      {paramName === "classify" && (
        <CreateNewClassify text="Tạo mới" paramName={paramName} />
      )}
      {paramName === "setting" && (
        <CreateNewConfig text="Tạo mới" paramName={paramName} />
      )}
      {paramName === "interface" && (
        <CreateNewInterface text="Tạo mới" paramName={paramName} />
      )}
      {paramName === "account" && (
        <CreateNewAccount text="Tạo mới" paramName={paramName} />
      )}
      {paramName === "layer" && (
        <CreateNewClass text="Tạo mới" paramName={paramName} />
      )}
    </div>
  );
}

export default NewCreateForm;

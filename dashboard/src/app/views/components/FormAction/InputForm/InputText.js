import React, { useRef, useEffect } from "react";
import clsx from "clsx";

// Thư mục
import styles from "./Input.module.scss";

function InputText({ id, textLabel, value, onChange, checkInput, type }) {
  // console.log(value);
  return (
    <div className={clsx("form-group", styles.wrapperInputText)}>
      {textLabel && <label htmlFor={id}>{textLabel}</label>}
      <input
        value={value[id]}
        onChange={(e) => onChange({ ...value, [id]: e.target.value })}
        type={type ? type : "text"}
        className={clsx("form-control", !value && checkInput && "is-invalid")}
        id={id}
        placeholder={textLabel}
      />
    </div>
  );
}

export default InputText;

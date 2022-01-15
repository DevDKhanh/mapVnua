import React from "react";
import clsx from "clsx";

// Thư mục
import styles from "./Input.module.scss";

function InputNumber({ id, textLabel, value, onChange, checkInput }) {
  return (
    <div className={clsx("form-group", styles.wrapperInputText)}>
      <label htmlFor={id}>{textLabel}:</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="number"
        className={clsx("form-control", !value && checkInput && "is-invalid")}
        id={id}
        min={0}
        placeholder={textLabel}
      />
    </div>
  );
}

export default InputNumber;

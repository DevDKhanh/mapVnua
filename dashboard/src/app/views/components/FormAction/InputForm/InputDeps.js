import React from "react";
import clsx from "clsx";

// Thư mục
import styles from "./Input.module.scss";

function InputDeps({ id, textLabel, arrayDeps, value, onChange }) {
  return (
    <div className={clsx("form-group", styles.wrapperInputText)}>
      <label htmlFor={id}>{textLabel}</label>
      <select
        className="form-control"
        id={id}
        onClick={(e) => onChange({ ...value, [id]: e.target.value })}
      >
        {arrayDeps.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default InputDeps;

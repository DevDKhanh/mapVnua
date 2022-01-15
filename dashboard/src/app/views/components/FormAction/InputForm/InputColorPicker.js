import React, { useState } from "react";
import clsx from "clsx";
import InputColor from "react-input-color";

//path of folder
import styles from "./Input.module.scss";
import InputText from "./InputText";

const InputColorPicker = ({ textLabel, id, value, onChange, checkInput }) => {
  return (
    <div className={clsx("form-group", styles.wrapper_input_color)}>
      <label htmlFor={id}>{textLabel}</label>
      <div className={styles.wrapper_input_picker}>
        <InputColor
          initialValue="#5e72e4"
          onChange={(e) => onChange({ ...value, [id]: e.hex })}
          placement="right"
        />
        <InputText
          id={id}
          value={value}
          onChange={onChange}
          checkInput={checkInput}
        />
      </div>
    </div>
  );
};

export default InputColorPicker;

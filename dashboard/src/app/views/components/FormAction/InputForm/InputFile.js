import React from "react";
import clsx from "clsx";

// Thư mục
import styles from "./Input.module.scss";

function InputFile({ id, textLabel, value, onChange, checkInput }) {
  const handleOnchange = (e) => {
    e.target.files[0].name &&
      onChange({ ...value, [id]: e.target.files[0].name });
  };

  return (
    <div className={clsx("form-group", styles.wrapperInputText)}>
      <label htmlFor={id}>{textLabel}:</label>
      <div className={clsx("custom-file")}>
        <input
          type="file"
          className={clsx(
            "custom-file-input",
            !value.id && checkInput && "is-invalid"
          )}
          id={id}
          accept="image/png, image/jpeg"
          onChange={handleOnchange}
        />
        <label className="custom-file-label" htmlFor={id}>
          {value[id]}
        </label>
      </div>
    </div>
  );
}

export default InputFile;

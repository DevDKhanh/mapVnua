import React, { useState } from "react";

// path of folder
import InputColorPicker from "./InputColorPicker";
import InputText from "./InputText";

const InputVector = ({ checkInput, value, onChange }) => {
  const arrayId = ["input9", "input10", "input11", "input12", "input13"];

  return (
    <div>
      <InputColorPicker
        id={arrayId[0]}
        textLabel="Màu viền"
        value={value}
        onChange={onChange}
        checkInput={checkInput}
      />
      <InputText
        id={arrayId[1]}
        textLabel="Độ rộng viền"
        value={value}
        onChange={onChange}
        checkInput={checkInput}
      />
      <InputText
        id={arrayId[2]}
        textLabel="Viền trong suốt"
        value={value}
        onChange={onChange}
        checkInput={checkInput}
      />
      <InputColorPicker
        id={arrayId[3]}
        textLabel="Màu nền"
        value={value}
        onChange={onChange}
        checkInput={checkInput}
      />
      <InputText
        id={arrayId[4]}
        textLabel="Nền trong suốt"
        value={value}
        onChange={onChange}
        checkInput={checkInput}
      />
    </div>
  );
};

export default InputVector;

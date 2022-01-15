import React, { useState } from "react";
import { Link } from "react-router-dom";

//Thư mục
import styles from "./form.module.scss";
import InputText from "../FormAction/InputForm/InputText";
import InputDeps from "../FormAction/InputForm/InputDeps";
import InputFile from "../FormAction/InputForm/InputFile";
import InputNumber from "../FormAction/InputForm/InputNumber";

function ConfigForm({ text, paramName, dataItem }) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false);

  let arrayDeps = ["Tiếng Việt", "Tiếng Anh", "Tiếng Trung", "Tiếng Pháp"];

  //state stores all input's data
  const [input1, setInput1] = useState(arrayDeps[0]);
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");

  //array the stores all the state of the input
  let stateArray = [input1, input2, input3, input4, input5, input6];

  //handle click of button to create new
  const handleClickCreateNew = () => {
    setCheckInput(true);
    console.log(stateArray);
  };

  return (
    <div className={styles.wrapperCreateNew}>
      <div className={styles.wrapper_main_form}>
        <h2>{text}</h2>
        <div className={styles.wrapperForm}>
          <InputDeps
            id="input1"
            textLabel="Tên ngôn ngữ"
            arrayDeps={arrayDeps}
            value={input1}
            onChange={setInput1}
          />
          <InputText
            id="input2"
            textLabel="Tiêu đề"
            value={input2}
            onChange={setInput2}
            checkInput={checkInput}
          />
          <InputText
            id="input3"
            textLabel="Tọa độ lat"
            value={input3}
            onChange={setInput3}
            checkInput={checkInput}
          />
          <InputText
            id="input4"
            textLabel="Tọa độ lng"
            value={input4}
            onChange={setInput4}
            checkInput={checkInput}
          />
          <InputNumber
            id="input5"
            textLabel="Zoom"
            value={input5}
            onChange={setInput5}
            checkInput={checkInput}
          />
          <InputFile
            id="input6"
            textLabel="Icon"
            value={input6}
            onChange={setInput6}
            checkInput={checkInput}
          />

          <div className={styles.wrapper_button}>
            <button onClick={handleClickCreateNew}>
              <Link
                to={
                  stateArray.every((state) => state !== "")
                    ? `/`
                    : `/new_create/${paramName}`
                }
              >
                Tạo mới
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigForm;

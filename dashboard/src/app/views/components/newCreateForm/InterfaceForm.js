import React, { useState } from "react";
import { Link } from "react-router-dom";

//Thư mục
import styles from "./form.module.scss";
import InputText from "../FormAction/InputForm/InputText";
import InputNumber from "../FormAction/InputForm/InputNumber";
import InputDeps from "../FormAction/InputForm/InputDeps";

function InterfaceForm({ text, paramName, dataItem }) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false);

  let arrayDeps = ["Tiếng Việt", "Tiếng Anh", "Tiếng Trung", "Tiếng Pháp"];
  //state stores all input's data
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState(arrayDeps[0]);
  const [input3, setInput3] = useState("");

  //array the stores all the state of the input
  let stateArray = [input1, input2, input3];

  //handle click of button to create new
  const handleClickCreateNew = () => {
    setCheckInput(true);
  };
  return (
    <div className={styles.wrapperCreateNew}>
      <div className={styles.wrapper_main_form}>
        <h2>{text}</h2>
        <div className={styles.wrapperForm}>
          <InputText
            id="input1"
            textLabel="Từ khóa"
            value={input1}
            onChange={setInput1}
            checkInput={checkInput}
          />
          <InputDeps
            id="input2"
            textLabel="Tên ngôn ngữ"
            value={input2}
            arrayDeps={arrayDeps}
            onChange={setInput2}
          />
          <InputText
            id="input3"
            textLabel="Dịch"
            value={input3}
            onChange={setInput3}
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

export default InterfaceForm;
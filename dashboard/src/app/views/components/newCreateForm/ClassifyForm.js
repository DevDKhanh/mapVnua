import React, { useState } from "react";
import { Link } from "react-router-dom";

//Thư mục
import styles from "./form.module.scss";
import InputText from "../FormAction/InputForm/InputText";
import InputDeps from "../FormAction/InputForm/InputDeps";

function ClassifyForm({ text, paramName, dataItem }) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false);

  let arrayDeps = ["Tiếng Việt", "Tiếng Anh", "Tiếng Trung", "Tiếng Pháp"];
  let arrayDeps1 = ["Có", "Không"];

  //state stores all input's data
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState(arrayDeps[0]);
  const [input4, setInput4] = useState(arrayDeps1[0]);

  //array the stores all the state of the input
  let stateArray = [input1, input2, input3, input4];

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
          <InputText
            id="input1"
            textLabel="ID phân loại"
            value={input1}
            onChange={setInput1}
            checkInput={checkInput}
          />
          <InputText
            id="input2"
            textLabel="Tên phân loại"
            value={input2}
            onChange={setInput2}
            checkInput={checkInput}
          />
          <InputDeps
            id="input3"
            textLabel="Tên ngôn ngữ"
            arrayDeps={arrayDeps}
            value={input3}
            onChange={setInput3}
          />
          <InputDeps
            id="input4"
            textLabel="Hiển thị"
            arrayDeps={arrayDeps1}
            value={input4}
            onChange={setInput4}
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

export default ClassifyForm;

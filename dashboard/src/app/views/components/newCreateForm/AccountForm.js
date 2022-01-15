import React, { useState } from "react";
import { Link } from "react-router-dom";

//Thư mục
import styles from "./form.module.scss";
import InputText from "../FormAction/InputForm/InputText";
import InputDeps from "../FormAction/InputForm/InputDeps";

function AccountForm({ text, paramName, setIsVisible, dataItem }) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false);

  let arrayDeps = ["Admin", "Biên tập viên"];
  //state stores all input's data
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState(arrayDeps[0]);

  //array the stores all the state of the input
  let stateArray = [input1, input2, input3, input4];

  //handle click of button to create new
  const handleClickCreateNew = () => {
    setCheckInput(true);
    console.log(stateArray);
  };

  return (
    <div className={styles.wrapperCreateNew}>
      <div
        className={styles.wrapper_main_form}
        onClick={() => setIsVisible(false)}
      >
        <h2>{text}</h2>
        <div className={styles.wrapperForm}>
          <InputText
            id="input1"
            textLabel="Tên người dùng"
            value={input1}
            onChange={setInput1}
            checkInput={checkInput}
          />
          <InputText
            id="input2"
            textLabel="Tài khoản"
            value={input2}
            onChange={setInput2}
            checkInput={checkInput}
          />
          <InputText
            id="input3"
            textLabel="Mật khẩu"
            value={input3}
            onChange={setInput3}
            checkInput={checkInput}
            type="password"
          />
          <InputDeps
            id="input4"
            textLabel="Mật khẩu"
            arrayDeps={arrayDeps}
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

export default AccountForm;

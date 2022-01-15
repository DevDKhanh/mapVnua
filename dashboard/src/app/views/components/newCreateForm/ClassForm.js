import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Thư mục
import styles from "./form.module.scss";
import InputText from "../FormAction/InputForm/InputText";
import InputDeps from "../FormAction/InputForm/InputDeps";
import InputFile from "../FormAction/InputForm/InputFile";
import InputRaster from "../FormAction/InputForm/InputRaster";
import InputVector from "../FormAction/InputForm/InputVector";

function ClassifyForm({ text, paramName, dataItem }) {
  // catch the first time button click event
  const [checkInput, setCheckInput] = useState(false);

  let arrayDeps1 = ["Lưu vực sông", "Tỉnh Gia Lai", "Gia Lai province"];
  let arrayDeps2 = ["Tiếng Việt", "Tiếng Anh", "Tiếng Trung", "Tiếng Pháp"];
  let arrayDeps3 = ["Khí tượng", "phân bổ dòng chảy"];
  let arrayDeps4 = ["Vector", "Raster"];
  let arrayDeps5 = ["Có", "Không"];

  //state stores all input's data
  const [inputForm, setInputForm] = useState({
    input1: "",
    input2: arrayDeps1[0],
    input3: arrayDeps2[0],
    input4: arrayDeps3[0],
    input5: "",
    input6: "",
    input7: "",
    input8: arrayDeps4[0],
    //vector
    input9: "",
    input10: "",
    input11: "",
    input12: "",
    input13: "",

    input14: "",
    // raster
    input15: "",
    input16: "",
    input17: "",
    input18: "",
  });

  useEffect(() => {
    console.log(inputForm["input8"]);
    if (inputForm["input8"] == "Raster") {
      console.log("vao tren");
      setInputForm({
        ...inputForm,
        input9: "",
        input10: "",
        input11: "",
        input12: "",
        input13: "",
      });
    } else {
      console.log("vao duoi");
      setInputForm({
        ...inputForm,
        input15: "",
        input16: "",
        input17: "",
        input18: "",
      });
    }
  }, [inputForm["input8"]]);

  let stateArray = Object.values(inputForm);

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
            textLabel="ID lớp"
            value={inputForm}
            onChange={setInputForm}
            checkInput={checkInput}
          />
          <InputDeps
            id="input2"
            textLabel="Tên khu vực"
            arrayDeps={arrayDeps1}
            value={inputForm}
            onChange={setInputForm}
          />
          <InputDeps
            id="input3"
            textLabel="Tên ngôn ngữ"
            arrayDeps={arrayDeps2}
            value={inputForm}
            onChange={setInputForm}
          />
          <InputDeps
            id="input4"
            textLabel="Tên phân loại"
            arrayDeps={arrayDeps3}
            value={inputForm}
            onChange={setInputForm}
          />
          <InputText
            id="input5"
            textLabel="Tên lớp"
            value={inputForm}
            onChange={setInputForm}
            checkInput={checkInput}
          />
          <InputFile
            id="input6"
            textLabel="Đường dẫn"
            value={inputForm}
            onChange={setInputForm}
            checkInput={checkInput}
          />
          <InputFile
            id="input7"
            textLabel="Icon"
            value={inputForm}
            onChange={setInputForm}
            checkInput={checkInput}
          />
          <InputDeps
            id="input8"
            textLabel="Kiểu"
            arrayDeps={arrayDeps4}
            value={inputForm}
            onChange={setInputForm}
          />
          {inputForm.input8 == "Raster" ? (
            <InputRaster
              checkInput={checkInput}
              setCheckInput={setCheckInput}
              value={inputForm}
              onChange={setInputForm}
            />
          ) : (
            <InputVector
              checkInput={checkInput}
              setCheckInput={setCheckInput}
              value={inputForm}
              onChange={setInputForm}
            />
          )}
          <InputDeps
            id="input14"
            textLabel="Hiển thị"
            arrayDeps={arrayDeps5}
            value={inputForm}
            onChange={setInputForm}
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

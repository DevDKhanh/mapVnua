import React, { useState, useEffect } from "react";

// path of folder
import styles from "./SeeDetail.module.scss";

// objectDataItem = lưu trữ dữ liệu item để hiển thị ra đúng số dòng
function SeeDetail({ setIsVisible, objectDataItem }) {
  // check state of button
  const [onClickBtn, setOnClickBtn] = useState(false);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div onClick={handleClick} className={styles.container_see_detail}>
      <h2>Xem chi tiết</h2>
      <div
        onClick={() => setOnClickBtn(false)}
        className={styles.wrapper_table}
      >
        <table>
          <tbody>
            {Object.keys(objectDataItem).map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                {Object.values(objectDataItem)[index].includes(".") ? (
                  <td>
                    <img src={Object.values(objectDataItem)[index]} />
                  </td>
                ) : (
                  <td>{Object.values(objectDataItem)[index]}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.wrapper_button}>
        {onClickBtn && (
          <div className={styles.wrapper_button_children}>
            <button>
              <i className="far fa-edit"></i>
            </button>
            <button>
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        )}
        <button onClick={() => setOnClickBtn(!onClickBtn)}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default SeeDetail;

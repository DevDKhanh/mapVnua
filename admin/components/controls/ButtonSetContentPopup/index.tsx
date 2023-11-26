import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React, { useCallback, useEffect, useState } from "react";

import { FiMove } from "react-icons/fi";
import SwitchButton from "../SwitchButton";
import clsx from "clsx";
import styles from "./ButtonSetContentPopup.module.scss";
import { toast } from "react-toastify";
import uploadAPI from "../../../api/upload";

const ButtonSetContentPopup = ({ form, setForm }: any) => {
  const [fileData, setFileData] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedFields = Array.from(data);
    const [movedField] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedField);
    setData(reorderedFields);
  };

  const handleUpdateData = useCallback(() => {
    if (fileData?.features) {
      const { properties } = fileData?.features?.[0];
      if (properties) {
        const convert: any[] = [];
        Object.entries(properties).forEach((v) => {
          convert.push({
            key: v[0],
            value: v[0],
            isCheck: true,
          });
        });
        setData(convert);
      }
    } else {
      toast.warn("Vui lòng chọ file");
    }
  }, [fileData?.features]);

  const handleInputChange = (index: number, event: any) => {
    const newValues = [...data];
    newValues[index] = {
      ...newValues[index],
      [event.target.name]: event.target.value,
    };

    setData(newValues);
  };

  const handleSubmit = () => {
    console.log(form?.titleDetail, JSON.stringify(data));
    setForm((prev: any) => ({ ...prev, titleDetail: JSON.stringify(data) }));
  };

  useEffect(() => {
    function onReaderLoad(event: any) {
      var obj = JSON.parse(event.target.result);
      setFileData(obj);
    }
    if (!!form.file && typeof form.file !== "string") {
      if (form.file?.type === "application/json") {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(form.file);
      } else {
        toast.warn("Sai định dạng đường dẫn");
      }
    } else if (typeof form.file === "string") {
      (async () => {
        try {
          const [res, status]: any = await uploadAPI.getFile(form.file);
          if (res && status === 200) {
            setFileData(res);
          }
        } catch (err) {}
      })();
    }
  }, [form.file]);

  useEffect(() => {
    try {
      if (
        form?.defaultData &&
        typeof JSON?.parse(form.defaultData) === "object"
      ) {
        setData(JSON.parse(form.defaultData));
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [form?.defaultData]);

  return (
    <div className={styles.container}>
      <h3>Tiêu đề chi tiết</h3>
      <div className={styles.main}>
        {data.length <= 0 ? (
          <p>
            Chọn tệp dữ liệu và bấm nút <strong>Lấy thông tin</strong>
          </p>
        ) : null}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="formFields">
            {(provided) => (
              <form {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((field, index) => (
                  <Draggable
                    key={field.key}
                    draggableId={field.key}
                    index={index}
                  >
                    {(provided) => (
                      <label
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.draggableItem}
                      >
                        <input
                          type="text"
                          name={"value"}
                          placeholder={field.key}
                          defaultValue={field.value}
                          onChange={(e) => handleInputChange(index, e)}
                        />
                        <SwitchButton
                          value={field.isCheck}
                          name="isCheck"
                          onChange={(e: any) => {
                            handleInputChange(index, e);
                          }}
                        />
                        <i>
                          <FiMove />
                        </i>
                      </label>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <div className={styles.groupBtn}>
                  {form?.defaultData != JSON.stringify(data) ? (
                    <div className={clsx(styles.btn)} onClick={handleSubmit}>
                      Áp dụng
                    </div>
                  ) : null}
                  {data.length <= 0 ? (
                    <div
                      className={clsx(styles.btn, styles.update)}
                      onClick={handleUpdateData}
                    >
                      Lấy thông tin
                    </div>
                  ) : null}
                </div>
              </form>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ButtonSetContentPopup;

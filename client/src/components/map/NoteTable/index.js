import { Fragment, useMemo, useState } from "react";

import { BiNotepad } from "react-icons/bi";
import ItemNote from "./components/ItemNote";
import { convertDataColor } from "../../../common/func/colorConvert";
import style from "./NoteTable.module.scss";
import { useSelector } from "react-redux";

function NoteTable() {
  const [show, setShow] = useState(true);
  const { layers } = useSelector((state) => state.dataMap);

  const sortLayers = useMemo(
    () =>
      layers.sort((a, b) => {
        const timea = new Date(a.createdAt);
        const timeb = new Date(b.createdAt);
        return timea - timeb;
      }),
    [layers]
  );

  const dataNote = useMemo(
    () =>
      sortLayers
        .filter((v) => v.activeNote === 1)
        .map((v) => {
          return {
            icon: v.icon,
            arrIcon: v.dataIcon !== "" ? JSON.parse(v.dataIcon) : [],
            data:
              v.dataColor === "#ffffff|0_0"
                ? []
                : convertDataColor(v.dataColor),
            titleNote: v.titleNote,
          };
        }),
    [sortLayers]
  );

  return (
    <>
      {dataNote.length > 0 ? (
        <Fragment>
          <div
            className={style.btnShow}
            onClick={() => {
              setShow(!show);
            }}
          >
            <BiNotepad />
          </div>
          {show ? (
            <div className={style.container}>
              <h4 className={style.title}>Chú thích</h4>
              <div className={style.main}>
                {dataNote.map((v, i) => (
                  <ItemNote key={i} data={v} index={i} />
                ))}
              </div>
            </div>
          ) : null}
        </Fragment>
      ) : null}
    </>
  );
}

export default NoteTable;

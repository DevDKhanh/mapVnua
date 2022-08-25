import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { convertDataColor } from '../../../common/func/colorConvert';
import ItemNote from './components/ItemNote';
import style from './NoteTable.module.scss';

function NoteTable() {
    const { layers } = useSelector((state) => state.dataMap);

    const dataNote = useMemo(
        () =>
            layers
                .filter((v) => v.activeNote === 1)
                .map((v) => {
                    if (v.keyColor === 'key') {
                        return {
                            data: [],
                            icon: v.icon,
                            titleNote: v.nameLayer,
                        };
                    }

                    return {
                        data: convertDataColor(v.dataColor),
                        titleNote: v.titleNote,
                    };
                }),
        [layers]
    );

    return (
        <>
            {dataNote.length > 0 ? (
                <div className={style.container}>
                    <h4 className={style.title}>Chú thích</h4>
                    {dataNote.map((v, i) => (
                        <ItemNote key={i} data={v} index={i} />
                    ))}
                </div>
            ) : null}
        </>
    );
}

export default NoteTable;

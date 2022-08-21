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
                .filter((v) => v.activeNote === 1 && v.titleNote !== '')
                .map((v) => {
                    return {
                        data: convertDataColor(v.dataColor),
                        titleNote: v.titleNote,
                    };
                }),
        [layers]
    );

    return (
        <div className={style.container}>
            {dataNote.map((v, i) => (
                <ItemNote key={i} data={v} index={i} />
            ))}
        </div>
    );
}

export default NoteTable;

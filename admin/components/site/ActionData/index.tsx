import { Eye, Edit2, ClipboardClose } from 'iconsax-react';
import style from './ActionData.module.scss';
function index() {
    return (
        <div className={style.main}>
            <div className={style.item}>
                <Eye variant="Bold" />
            </div>
            <div className={style.item}>
                <Edit2 variant="Bold" />
            </div>
            <div className={style.item}>
                <ClipboardClose variant="Bold" />
            </div>
        </div>
    );
}

export default index;

import style from './Popup.module.scss';
function DeleteData(props: any) {
    return (
        <div className={style.container}>
            <div className={style.main}>
                <h2>Bạn chắc chắn muốn xóa?</h2>
                <div className={style.groupBtn}>
                    <button className={style.btn} onClick={props.onClose}>
                        Hủy
                    </button>
                    <button className={style.btn} onClick={props.onSubmit}>
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteData;

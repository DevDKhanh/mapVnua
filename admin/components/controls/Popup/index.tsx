import React, { Fragment } from 'react';
import style from './Popup.module.scss';
/*===========> INTERFACE <==========*/
interface props {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    [props: string]: any;
}

/*===========> MAIN COMPONENT <==========*/
function Overlay({ open, onClose, children }: props) {
    return (
        <Fragment>
            {open && (
                <Fragment>
                    <div className="overlay" onClick={onClose}></div>
                    <div className={style.main}>{children}</div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Overlay;

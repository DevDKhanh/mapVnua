import React, { Fragment, useEffect } from 'react';
interface props {
    isShow?: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

function Popup({ isShow, children, onClose }: props) {
    return (
        <Fragment>
            {isShow && (
                <Fragment>
                    <div className="overlay" onClick={onClose}></div>
                    {children}
                </Fragment>
            )}
        </Fragment>
    );
}
export default Popup;

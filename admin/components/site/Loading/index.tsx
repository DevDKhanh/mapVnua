import React from 'react';
import Lottie from 'react-lottie';
import * as loading from '../../../assets/anim/97388-bubble-loading.json';
import * as delivery from '../../../assets/anim/97383-yellow-delivery-guy.json';

import style from './Loading.module.scss';

interface props {
    isLoading?: boolean;
    children?: React.ReactNode;
    isSubmit?: boolean;
    isLoadPage?: boolean;
}

function Loading({ isLoading, children, isSubmit, isLoadPage }: props) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: delivery,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    if (isSubmit) {
        return (
            <>
                {isLoading ? (
                    <div className={style.mainSubmit}>
                        <Lottie
                            options={defaultOptions2}
                            height={100}
                            width={200}
                        />
                    </div>
                ) : null}
            </>
        );
    }

    if (isLoadPage) {
        return (
            <>
                {isLoading ? (
                    <div className={style.mainPage}>
                        <Lottie
                            options={defaultOptions2}
                            height={100}
                            width={200}
                        />
                    </div>
                ) : null}
            </>
        );
    }

    if (!isLoading) {
        return <>{children}</>;
    }

    return (
        <div className={style.main}>
            <Lottie options={defaultOptions} height={50} width={200} />
        </div>
    );
}

export default Loading;

import clsx from 'clsx';
import { useCallback } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import style from './PaginationCustom.module.scss';

interface props {
    pageSize: number;
    page: number;
    totalItem: number;
    onSetPage: (page: number) => void;
}

function PaginationCustom(props: props) {
    const handlePrevious = useCallback(() => {
        if (props.page > 1) {
            props.onSetPage(props.page - 1);
        }
    }, [props]);

    const handleNext = useCallback(() => {
        if (props.page < Math.ceil(props.totalItem / props.pageSize)) {
            props.onSetPage(props.page + 1);
        }
    }, [props]);

    return (
        <div className={style.main}>
            <div
                className={clsx([style.btn, { [style.lock]: props.page <= 1 }])}
                onClick={handlePrevious}
            >
                <RiArrowDropLeftLine />
            </div>
            <span className={style.display}>{props.page}</span>
            <div
                className={clsx([
                    style.btn,
                    {
                        [style.lock]:
                            props.page >=
                            Math.ceil(props.totalItem / props.pageSize),
                    },
                ])}
                onClick={handleNext}
            >
                <RiArrowDropRightLine />
            </div>
        </div>
    );
}

export default PaginationCustom;

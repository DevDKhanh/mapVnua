import clsx from 'clsx';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useState } from 'react';
import { useStyleClass } from '../../../common/hooks/useStyleClass';
import style from './index.module.scss';

/* -------------------------- khai báo kiểu dữ liệu ------------------------- */
interface ICol {
    title: string;
    template: any;
    customClass?: Array<string>;
}
interface IDataTableProps {
    data: any;
    columns: Array<ICol>;
    [props: string]: any;
}

export default function DataTable({
    data = [],
    columns,
    ...props
}: IDataTableProps) {
    const customStyle = useStyleClass(props, style);

    /* --------------------------------- actions -------------------------------- */
    function getCustomclass(customClass: any) {
        return customClass
            ? clsx(
                  customClass.map((item: any) => {
                      return style[item];
                  })
              )
            : '';
    }
    return (
        <>
            <div className={clsx(style.container, customStyle)}>
                <table>
                    <thead>
                        <tr>
                            {columns.map((item: any, index: number) => {
                                return (
                                    <th key={'head_' + index}>
                                        <div
                                            className={getCustomclass(
                                                item?.customClass
                                            )}
                                        >
                                            {item.title}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item: any, index: any) => {
                            return (
                                <tr key={'row_' + index}>
                                    {columns.map(
                                        (itemCol: any, indexCol: number) => {
                                            return (
                                                <td
                                                    key={`cell_${index}_${indexCol}`}
                                                >
                                                    <div
                                                        className={getCustomclass(
                                                            itemCol?.customClass
                                                        )}
                                                    >
                                                        {itemCol.template(
                                                            data[index],
                                                            indexCol
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        }
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

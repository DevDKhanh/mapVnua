import { Avatar, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import languageAPI from '../../../api/language';
import ButtonCreate from '../../../components/controls/ButtonCreate';
import ActionData from '../../../components/site/ActionData';
import Pagination from '../../../components/site/Pagination';
import DataTable from '../../../components/site/Table';
import { DashboardLayout } from '../../../components/widgets/Layout';
import { API_URL } from '../../../constants/config';

function Index() {
    const router = useRouter();

    const [totalItem, setTotalItem] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageCurrent, setPageCurrent] = useState<number>(1);
    const [list, setList] = useState<any>([]);

    useEffect(() => {
        (async () => {
            try {
                const [res, status]: any = await languageAPI.get({
                    page: pageCurrent,
                    pageSize,
                });
                if (res && status === 200) {
                    setList(res.records);
                    setTotalItem(res.total);
                }
            } catch (err) {}
        })();
    }, [pageCurrent, pageSize, router]);

    const detailData = {
        'Hình ảnh kí hiệu': 'icon',
        'ID ngôn ngữ': 'id',
        'Tên ngôn ngữ': 'nameLanguage',
    };

    return (
        <DashboardLayout title="Ngôn ngữ">
            <ButtonCreate href="/page/language/create" />
            <DataTable
                data={list}
                columns={[
                    {
                        title: 'STT',
                        template: (data: any, i: number) => {
                            return i + 1;
                        },
                    },
                    {
                        title: 'ID ngôn ngữ',
                        template: (data: any) => {
                            return data.id;
                        },
                    },
                    {
                        title: 'Tên ngôn ngữ',
                        template: (data: any) => {
                            return data.nameLanguage;
                        },
                    },
                    {
                        title: 'Icon',
                        template: (data: any) => {
                            return (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Avatar
                                        alt={'icon image'}
                                        src={`${API_URL}/upload${data.icon}`}
                                    />
                                </Box>
                            );
                        },
                    },
                    {
                        title: 'Hành động',
                        template: (data: any) => {
                            return (
                                <ActionData
                                    id={data.id}
                                    url="language"
                                    detailData={detailData}
                                />
                            );
                        },
                    },
                ]}
            />
            <Pagination
                totalItem={totalItem}
                pageSize={pageSize}
                pageCurrent={pageCurrent}
                onSetPage={setPageCurrent}
                onSetPageSize={setPageSize}
            />
        </DashboardLayout>
    );
}

export default memo(Index);

import axiosClient from '.';
const base: string = '/area';

const areaAPI = {
    get: (
        data: { page: number; pageSize: number; langId?: string },
        tokenAxios?: any
    ) => {
        return axiosClient.get(
            `${base}?page=${data.page}&pageSize=${data.pageSize}&langId=${
                data?.langId || ''
            }`,
            {
                cancelToken: tokenAxios,
            }
        );
    },
    post: (data: any, token: string, tokenAxios?: any) => {
        return axiosClient.post(`${base}`, data, {
            cancelToken: tokenAxios,
            headers: {
                authorization: 'Bearer ' + token,
            },
        });
    },
    update: (id: any, data: any, token: string, tokenAxios?: any) => {
        return axiosClient.put(`${base}/${id}`, data, {
            cancelToken: tokenAxios,
            headers: {
                authorization: 'Bearer ' + token,
            },
        });
    },
};

export default areaAPI;

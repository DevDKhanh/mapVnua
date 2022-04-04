import axiosClient from '.';
const base: string = '/area';

const areaAPI = {
    get: (data: { page: number; pageSize: number }, tokenAxios?: any) => {
        return axiosClient.get(
            `${base}?page=${data.page}&pageSize=${data.pageSize}`,
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
};

export default areaAPI;

import axiosClient from '.';
const base: string = '/upload';

const uploadAPI = {
    upload: (
        type: 'image' | 'file',
        data: any,
        token: string,
        tokenAxios?: any
    ) => {
        return axiosClient.post(`${base}/${type}`, data, {
            cancelToken: tokenAxios,
            headers: {
                authorization: 'Bearer ' + token,
            },
        });
    },
    getFile: (link: string, tokenAxios?: any) => {
        return axiosClient.get(`${base}${link}`, {
            cancelToken: tokenAxios,
        });
    },
    getPaths: (
        data: { page: number; pageSize: number; type: number },
        tokenAxios?: any
    ) => {
        return axiosClient.get(
            `${base}?page=${data.page}&pageSize=${data.pageSize}&type=${data.type}`,
            {
                cancelToken: tokenAxios,
            }
        );
    },
};

export default uploadAPI;

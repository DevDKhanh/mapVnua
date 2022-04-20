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
};

export default uploadAPI;

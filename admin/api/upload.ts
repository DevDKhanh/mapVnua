import axiosClient from '.';
const base: string = '/upload';

const uploadAPI = {
    upImage: (data: any, token: string, tokenAxios?: any) => {
        return axiosClient.post(`${base}/image`, data, {
            cancelToken: tokenAxios,
            headers: {
                authorization: 'Bearer ' + token,
            },
        });
    },
};

export default uploadAPI;

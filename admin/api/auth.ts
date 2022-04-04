import axiosClient from '.';

const authAPI = {
    login: (data: any, tokenAxios?: any) => {
        return axiosClient.post('/auth/login', data, {
            cancelToken: tokenAxios,
        });
    },
};

export default authAPI;

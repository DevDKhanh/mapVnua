import axiosClient from '.';

const authAPI = {
    login: (data: any, tokenAxios?: any) => {
        return axiosClient.post('/auth/login', data, {
            cancelToken: tokenAxios,
        });
    },
    signup: (data: any, tokenAxios?: any) => {
        return axiosClient.post('/auth/login', data, {
            cancelToken: tokenAxios,
        });
    },
    getInfo: (token: any, tokenAxios?: any) => {
        return axiosClient.get('/permission', {
            cancelToken: tokenAxios,
            headers: {
                authorization: 'Bearer ' + token,
            },
        });
    },
    getList: (
        data: { page: number; pageSize: number; token: string },
        tokenAxios?: any
    ) => {
        return axiosClient.get(
            `/auth/users?page=${data.page}&pageSize=${data.pageSize}`,
            {
                cancelToken: tokenAxios,
                headers: {
                    authorization: 'Bearer ' + data.token,
                },
            }
        );
    },
    getDetail: (id: string, token: string, tokenAxios?: any) => {
        return axiosClient.get(`/auth/users/user/${id}`, {
            cancelToken: tokenAxios,
            headers: {
                authorization: 'Bearer ' + token,
            },
        });
    },
};

export default authAPI;

import axiosClient from '.';

const classifyAPI = {
    get: (data: { page: number; pageSize: number }, tokenAxios?: any) => {
        return axiosClient.get(
            `/classify?page=${data.page}&pageSize=${data.pageSize}`,
            {
                cancelToken: tokenAxios,
            }
        );
    },
};

export default classifyAPI;

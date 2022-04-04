import axiosClient from '.';

const layerAPI = {
    get: (data: { page: number; pageSize: number }, tokenAxios?: any) => {
        return axiosClient.get(
            `/layer?page=${data.page}&pageSize=${data.pageSize}`,
            {
                cancelToken: tokenAxios,
            }
        );
    },
};

export default layerAPI;

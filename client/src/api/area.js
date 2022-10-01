import axiosClient from '.';

const routeName = '/area';

const areaAPI = {
    getList: (tokenAxios, page = 1, pageSize = 10, langId = 'vi') => {
        const url = `${routeName}?page=${page}&pageSize=${pageSize}&langId=${langId}&keyword`;
        return axiosClient.get(url, {
            cancelToken: tokenAxios,
        });
    },
};

export default areaAPI;

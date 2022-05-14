import axiosClient from '.';

const routeName = '/classify';

const classifyAPI = {
    getList: (
        tokenAxios,
        page = 1,
        pageSize = 10,
        langId = '',
        areaId = ''
    ) => {
        const url = `${routeName}?page=${page}&pageSize=${pageSize}&langId=${langId}&areaId=${areaId}`;
        return axiosClient.get(url, {
            cancelToken: tokenAxios,
        });
    },
};

export default classifyAPI;

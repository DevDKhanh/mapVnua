import axiosClient from '.';

const routeName = '/layer';

const layerAPI = {
    getList: (
        tokenAxios,
        page = 1,
        pageSize = 10,
        langId = '',
        areaId = '',
        classifyId = ''
    ) => {
        const url = `${routeName}/data?page=${page}&pageSize=${pageSize}&langId=${langId}&areaId=${areaId}&classifyId=${classifyId}`;
        return axiosClient.get(url, {
            cancelToken: tokenAxios,
        });
    },
};

export default layerAPI;

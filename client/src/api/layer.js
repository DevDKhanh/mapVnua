import axiosClient from '.';

const routeName = '/layer';

const layerAPI = {
	getList: (tokenAxios, page = 1, pageSize = 10) => {
		const url = `${routeName}?page=${page}&pageSize=${pageSize}`;
		return axiosClient.get(url, {
			cancelToken: tokenAxios,
		});
	},
};

export default layerAPI;

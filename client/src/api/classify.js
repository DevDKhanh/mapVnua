import axiosClient from '.';

const routeName = '/classify';

const classifyAPI = {
	getList: (tokenAxios, page = 1, pageSize = 10) => {
		const url = `${routeName}?page=${page}&pageSize=${pageSize}`;
		return axiosClient.get(url, {
			cancelToken: tokenAxios,
		});
	},
};

export default classifyAPI;

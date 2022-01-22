import axiosClient from '.';

const routeName = '/upload';

const uploadAPI = {
	getFile: (tokenAxios, path) => {
		const url = `${routeName}${path}`;
		return axiosClient.get(url, {
			cancelToken: tokenAxios,
		});
	},
};

export default uploadAPI;

import axios from 'axios';
import queryString from 'query-string';
import { API } from '../constant/config';

const axiosClient = axios.create({
	headers: {
		'content-type': 'application/json',
	},
	baseURL: API,
	paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
	return config;
});

axiosClient.interceptors.response.use(
	response => {
		if (response && response.data) {
			return [response.data, response.status];
		}

		return response;
	},
	error => {
		if (error.response && error.response.data) {
			throw error.response.data;
		}

		if (!axios.isCancel(error)) throw error;
	},
);

export default axiosClient;

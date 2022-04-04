import axios from 'axios';
import queryString from 'query-string';
import { API_URL } from '../constants/config';

const axiosClient = axios.create({
    headers: {
        'content-type': 'application/json',
    },
    baseURL: API_URL,
    paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosClient.defaults.timeout = 10000;

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return [response.data, response.status];
        }

        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            throw error.response.data;
        }

        if (!axios.isCancel(error)) throw error;
    }
);
export default axiosClient;

export const axiosCustom = axios.create({
    headers: {
        'content-type': 'application/json',
    },
    baseURL: '/',
    paramsSerializer: (params: any) => queryString.stringify(params),
});

axiosCustom.defaults.timeout = 10000;

axiosCustom.interceptors.request.use(async (config: any) => {
    return config;
});

axiosCustom.interceptors.response.use(
    (response: any) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error: any) => {
        if (error.response && error.response.data) {
            throw error.response.data;
        }

        if (!axios.isCancel(error)) throw error;
    }
);

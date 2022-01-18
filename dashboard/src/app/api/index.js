import axios from 'axios'
// import { API_URL } from "../constants/config";
import queryString from 'query-string'

const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
  },
  baseURL: 'http://localhost:3000',
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return [response.data, response.status]
    }

    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      throw error.response.data
    }

    if (!axios.isCancel(error)) throw error
  }
)

export default axiosClient

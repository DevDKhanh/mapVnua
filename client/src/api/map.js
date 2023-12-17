import axiosClient from ".";

const routeName = "/map";

const mapAPI = {
  getList: (tokenAxios, page = 1, pageSize = 10) => {
    const url = `${routeName}?page=${page}&pageSize=${pageSize}&keyword`;
    return axiosClient.get(url, {
      cancelToken: tokenAxios,
    });
  },
};

export default mapAPI;

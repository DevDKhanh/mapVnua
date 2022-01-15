import axiosClient from "../";

const tableDataAPI = {
  create: (data, tokenAxios, nameParam) => {
    const url = nameParam;
    return axiosClient.post(url, data, {
      cancelToken: tokenAxios,
    });
  },
  getList: (nameParam, pageNumber, pageSize, tokenAxios) => {
    const url = `${nameParam}?page=${pageNumber}&pageSize=${pageSize}`;
    return axiosClient.get(url, {
      cancelToken: tokenAxios,
    });
  },
};

export default tableDataAPI;

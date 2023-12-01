import axiosClient from ".";
const base: string = "/colors";

const colorAPI = {
  get: (
    data: {
      page: number;
      pageSize: number;
      keyword?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(
      `${base}?page=${data.page}&pageSize=${data.pageSize}&keyword=${data?.keyword}`,
      {
        cancelToken: tokenAxios,
      }
    );
  },
  post: (data: any, token: string, tokenAxios?: any) => {
    return axiosClient.post(`${base}`, data, {
      cancelToken: tokenAxios,
      headers: {
        authorization: "Bearer " + token,
      },
    });
  },
  postMany: (data: any[], token: string, tokenAxios?: any) => {
    return axiosClient.post(
      `${base}/many`,
      { data },
      {
        cancelToken: tokenAxios,
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
  },
  searchColors: (data: any, token: string, tokenAxios?: any) => {
    return axiosClient.post(`${base}/search-colors`, data, {
      cancelToken: tokenAxios,
      headers: {
        authorization: "Bearer " + token,
      },
    });
  },
  update: (id: any, data: any, token: string, tokenAxios?: any) => {
    return axiosClient.put(`${base}/${id}`, data, {
      cancelToken: tokenAxios,
      headers: {
        authorization: "Bearer " + token,
      },
    });
  },
};

export default colorAPI;

import axiosClient from ".";

const siteAPI = {
  del: (
    url:
      | "setting"
      | "language"
      | "layer"
      | "classify"
      | "area"
      | "display"
      | "colors"
      | "map",
    id: number,
    token: string,
    tokenAxios?: any
  ) => {
    return axiosClient.delete(`/${url}/${id}`, {
      cancelToken: tokenAxios,
      headers: {
        authorization: "Bearer " + token,
      },
    });
  },
  get: (
    url:
      | "setting"
      | "language"
      | "layer"
      | "classify"
      | "area"
      | "display"
      | "map"
      | "colors",
    id: any,
    token: string,
    tokenAxios?: any
  ) => {
    return axiosClient.get(`/${url}/${id}`, {
      cancelToken: tokenAxios,
      headers: {
        authorization: "Bearer " + token,
      },
    });
  },
};

export default siteAPI;

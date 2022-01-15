import axiosClient from ".";

const routeName = "/auth";

const authAPI = {
  sendOTP: (data, tokenAxios) => {
    const url = `${routeName}/send-otp`;
    return axiosClient.post(url, data, {
      cancelToken: tokenAxios,
    });
  },
  login: (data, tokenAxios) => {
    const url = `${routeName}/login`;
    return axiosClient.post(url, data, {
      cancelToken: tokenAxios,
    });
  },
  register: (data, tokenAxios) => {
    const url = `${routeName}/register`;
    return axiosClient.post(url, data, {
      cancelToken: tokenAxios,
    });
  },
};

export default authAPI;

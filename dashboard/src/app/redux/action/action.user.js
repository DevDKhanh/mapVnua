import { SET_USER_INFO } from "../constantRedux/type.userInfo";

export const setUserInfo = (payload) => {
  return {
    type: SET_USER_INFO,
    payload: payload,
  };
};

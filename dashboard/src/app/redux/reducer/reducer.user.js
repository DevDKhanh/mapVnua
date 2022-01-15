import { SET_USER_INFO } from "../constantRedux/type.userInfo";

const INITIAL_STATE = {
  userInfo: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action["type"]) {
    case SET_USER_INFO: {
      return { ...state, userInfo: action["payload"] };
    }
    default:
      return state;
  }
};

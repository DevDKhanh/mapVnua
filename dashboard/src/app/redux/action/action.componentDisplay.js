import { REQ_COMPONENTS_DISPLAY } from "../constantRedux/type.ComponentDisplay";

export const reqDisplay = (payload) => {
  return {
    type: REQ_COMPONENTS_DISPLAY,
    payload: payload,
  };
};

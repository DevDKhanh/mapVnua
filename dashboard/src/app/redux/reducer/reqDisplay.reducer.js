import { REQ_COMPONENTS_DISPLAY } from "../constantRedux/type.ComponentDisplay";

const INITIAL_STATE = {
  textComponentDisplay: "Khu vực",
  data: "datatable khu vực",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REQ_COMPONENTS_DISPLAY:
      return {
        ...state,
        textComponentDisplay: payload.text,
        data: payload.data,
      };

    default:
      return state;
  }
};

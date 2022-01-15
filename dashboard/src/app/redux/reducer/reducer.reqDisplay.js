import { REQ_COMPONENTS_DISPLAY } from "../constantRedux/type.ComponentDisplay";

const INITIAL_STATE = {
  textComponentDisplay: "Khu vực",
  data: null,
  theadTable: "home",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REQ_COMPONENTS_DISPLAY:
      return {
        ...state,
        textComponentDisplay: payload.text,
        data: payload.data,
        theadTable: payload.theadTable,
      };

    default:
      return state;
  }
};

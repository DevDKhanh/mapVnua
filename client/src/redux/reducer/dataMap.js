/* eslint-disable import/no-anonymous-default-export */
import {
  BASE_MAP,
  DATA_ADD,
  DATA_ADD_LAYER,
  DATA_REMOVE_LAYER,
  UPDATE_AREA,
  UPDATE_LANGUAGE,
  UPDATE_LAYER,
} from "../action/dataMap";

const initialState = {
  dataLayers: [], //layers detail
  layers: [], //layers display
  classifys: [],
  setting: [],
  language: [],
  area: [],
  baseMap: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BASE_MAP:
      return {
        ...state,
        baseMap: payload,
      };
    case DATA_ADD:
      return {
        ...state,
        dataLayers: payload.layers,
        classifys: payload.classifys,
        setting: payload.setting,
      };
    case DATA_ADD_LAYER:
      return {
        ...state,
        layers: [...state.layers, payload],
      };
    case UPDATE_LAYER:
      return {
        ...state,
        layers: payload,
      };
    case DATA_REMOVE_LAYER:
      return {
        ...state,
        layers: [...state.layers.filter((item) => item.id !== payload)],
      };
    case UPDATE_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    case UPDATE_AREA:
      return {
        ...state,
        area: payload,
      };
    default:
      return state;
  }
};

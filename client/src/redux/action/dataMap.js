/*---------- Types ----------*/
export const DATA_ADD = "data/add";
export const DATA_ADD_LAYER = "layer/add";
export const DATA_REMOVE_LAYER = "layer/remove";
export const UPDATE_LAYER = "layer/update";
export const UPDATE_LANGUAGE = "language/update";
export const UPDATE_AREA = "area/update";
export const BASE_MAP = "data/baseMap";

/*---------- Actions ----------*/
export const setBaseMap = (data) => {
  return { type: BASE_MAP, payload: data };
};

export const dataMapAdd = (layers = [], classifys = [], setting = []) => {
  return { type: DATA_ADD, payload: { layers, classifys, setting } };
};

export const updateLayer = (layers) => {
  return { type: UPDATE_LAYER, payload: layers };
};

export const addLayer = (layer) => {
  return { type: DATA_ADD_LAYER, payload: layer };
};

export const removeLayer = (id) => {
  return { type: DATA_REMOVE_LAYER, payload: id };
};

export const updateLanguage = (data) => {
  return { type: UPDATE_LANGUAGE, payload: data };
};

export const updateArea = (data) => {
  return { type: UPDATE_AREA, payload: data };
};

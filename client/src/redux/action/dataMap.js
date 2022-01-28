/*---------- Types ----------*/
export const DATA_ADD = 'data/add';
export const DATA_ADD_LAYER = 'layer/add';
export const DATA_REMOVE_LAYER = 'layer/remove';

/*---------- Actions ----------*/
export const dataMapAdd = (layers = [], classifys = [], setting = []) => {
    return { type: DATA_ADD, payload: { layers, classifys, setting } };
};

export const addLayer = (layer) => {
    return { type: DATA_ADD_LAYER, payload: layer };
};

export const removeLayer = (id) => {
    return { type: DATA_REMOVE_LAYER, payload: id };
};

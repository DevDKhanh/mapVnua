import { DATA_ADD, DATA_ADD_LAYER, DATA_REMOVE_LAYER } from '../action/dataMap';

const initialState = {
    dataLayers: [], //layers detail
    layers: [], //layers display
    classifys: [],
    setting: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
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
        case DATA_REMOVE_LAYER:
            return {
                ...state,
                layers: [...state.layers.filter((item) => item.id !== payload)],
            };
        default:
            return state;
    }
};

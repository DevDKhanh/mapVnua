import { DATA_ADD, DATA_ADD_LAYER, DATA_REMOVE_LAYER } from '../action/dataMap';

const initialState = {
	dataLayers: [], //detail
	classifys: [],
	layers: [],
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case DATA_ADD:
			return {
				...state,
				dataLayers: payload.layers,
				classifys: payload.classifys,
			};
		case DATA_ADD_LAYER:
			return {
				...state,
				layers: [...state.layers, payload],
			};
		case DATA_REMOVE_LAYER:
			return {
				...state,
				layers: [...state.layers.filter(item => item.id !== payload)],
			};
		default:
			return state;
	}
};

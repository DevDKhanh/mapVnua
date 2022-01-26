import * as OVERIMAGE from '../action/overImage';

const initialState = {
    SIZE_H: 1,
    SIZE_W: 1,
    STEP: 0.01,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case OVERIMAGE.INC_H:
            return { ...state, SIZE_H: state.SIZE_H + state.STEP };
        case OVERIMAGE.DEC_H:
            return { ...state, SIZE_H: state.SIZE_H - state.STEP };
        case OVERIMAGE.INC_W:
            return { ...state, SIZE_W: state.SIZE_W + state.STEP };
        case OVERIMAGE.DEC_W:
            return { ...state, SIZE_W: state.SIZE_W - state.STEP };
        default:
            return state;
    }
};

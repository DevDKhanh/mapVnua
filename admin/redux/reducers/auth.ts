import * as AUTH from '../type/auth';

const initialState = {
    token: null,
    dataUser: null,
    isLoading: true,
    isLogged: false,
    permission: null,
};

export default (state = initialState, { type, payload }: any) => {
    switch (type) {
        case AUTH.LOGIN:
            return { ...state, ...payload, isLogged: true };
        case AUTH.LOGOUT:
            return {
                ...state,
                ...payload,
                isLogged: false,
                dataUser: null,
                token: null,
            };
        case AUTH.DONE_LOAD:
            return { ...state, isLoading: false };
        case AUTH.UPDATE_PERMISSIONS:
            return { ...state, permission: payload };
        default:
            return state;
    }
};

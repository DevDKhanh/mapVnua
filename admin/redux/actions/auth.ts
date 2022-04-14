import {
    deleteItemStorage,
    setItemStorage,
} from '../../common/utils/localStorage';
import * as AUTH from '../type/auth';

export const doneLoad = () => ({
    type: AUTH.DONE_LOAD,
});

export const login = (payload: any) => {
    setItemStorage('_token', payload.token);
    setItemStorage('_dataUser', payload.dataUser);
    return {
        type: AUTH.LOGIN,
        payload,
    };
};

export const logout = () => {
    deleteItemStorage('_token');
    deleteItemStorage('_dataUser');
    return {
        type: AUTH.LOGOUT,
    };
};

export const updatePermission = (payload: any) => {
    return {
        type: AUTH.UPDATE_PERMISSIONS,
        payload,
    };
};

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authAPI from '../../../api/auth';
import { getItemStorage } from '../../../common/utils/localStorage';
import { login, doneLoad, updatePermission } from '../../../redux/actions/auth';
import { RootState } from '../../../redux/reducers';

interface props {
    name?: string;
    children: React.ReactNode;
}

function SplashScreen({ children }: props) {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        const _dataUser: any = getItemStorage('_dataUser');
        const _token: any = getItemStorage('_token');
        if (_dataUser && _token) {
            (async () => {
                const [resPermission, status]: any = await authAPI.getInfo(
                    _token
                );

                if (resPermission && status === 200) {
                    dispatch(login({ token: _token, dataUser: _dataUser }));
                    dispatch(updatePermission(resPermission));
                    dispatch(doneLoad());
                }
            })();
        } else {
            dispatch(doneLoad());
        }
    }, []);

    if (!isLoading) {
        return <>{children}</>;
    }

    return <></>;
}

export default SplashScreen;

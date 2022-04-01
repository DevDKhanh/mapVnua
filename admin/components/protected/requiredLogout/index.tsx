import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';

interface IrequiredLogoutProps {
    children: React.ReactNode;
}

export default function RequiredLogout(props: IrequiredLogoutProps) {
    const router = useRouter();

    const { isLogged, isLoading } = useSelector(
        (state: RootState) => state.auth
    );

    React.useEffect(() => {
        if (isLogged && !isLoading) {
            router.push('/home');
        }
    }, [isLogged, isLoading]);

    if (!isLogged && !isLoading) {
        return <>{props.children}</>;
    }

    return <></>;
}

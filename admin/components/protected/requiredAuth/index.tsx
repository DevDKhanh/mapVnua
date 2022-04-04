import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../redux/reducers';

interface IRequireAuthProps {
    children: React.ReactNode;
}

export default function RequireAuth(props: IRequireAuthProps) {
    const router = useRouter();

    const { isLogged, isLoading } = useSelector(
        (state: RootState) => state.auth
    );

    React.useEffect(() => {
        if (!isLogged && !isLoading) {
            router.push('/');
        }
    }, [isLogged, isLoading]);

    if (isLogged && !isLoading) {
        return <>{props.children}</>;
    }

    return <></>;
}

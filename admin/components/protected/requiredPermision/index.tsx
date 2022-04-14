import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../../redux/reducers';

interface IRequiredPermisionProps {
    children: React.ReactNode;
    role?: number;
    isEdit?: boolean;
    isSeen?: boolean;
    isCreate?: boolean;
}

export default function RequiredPermision({
    children,
    role = 0,
    isSeen = false,
    isEdit = false,
    isCreate = false,
}: IRequiredPermisionProps) {
    const router = useRouter();

    const { permission, isLoading } = useSelector(
        (state: RootState) => state.auth
    );

    React.useEffect(() => {
        if (permission && !isLoading) {
            if (permission?.role < role) {
                router.push('/home');
            }

            if (!permission?.permissionSeen && isSeen) {
                router.push('/home');
            }

            if (!permission?.permissionEdit && isEdit) {
                router.push('/home');
            }

            if (!permission?.permissionCreate && isCreate) {
                router.push('/home');
            }
        }

        if (!permission && !isLoading) {
            router.push('/home');
        }
    }, [permission, isLoading]);

    if (!!permission && !isLoading) {
        return <>{children}</>;
    }

    return <></>;
}

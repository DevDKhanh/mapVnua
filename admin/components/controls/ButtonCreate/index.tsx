import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';

interface props {
    href: string;
    title?: string;
}

function Index({ href, title = 'Thêm mới' }: props) {
    const { permission } = useSelector((state: RootState) => state.auth);

    if (!permission?.permissionCreate) {
        return null;
    }

    return (
        <Link href={href}>
            <a className="btn-create">{title}</a>
        </Link>
    );
}

export default Index;

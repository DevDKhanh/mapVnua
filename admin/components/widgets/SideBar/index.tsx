import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Home, Category, Bookmark, SecuritySafe } from 'iconsax-react';

import { Box, Button, Divider, Drawer, useMediaQuery } from '@mui/material';
import { Logo } from './logo';
import { NavItem } from './item';
import { RootState } from '../../../redux/reducers';
import { logout } from '../../../redux/actions/auth';
import { toast } from 'react-toastify';

const items = [
    {
        href: '/home',
        icon: <Home size="24" color="#5047e5" variant="Bold" />,
        title: 'Trang chủ',
    },
    {
        href: '/category',
        icon: <Category color="#5047e5" variant="Bold" />,
        title: 'Quản lí danh mục',
    },
    {
        href: '/page',
        icon: <Bookmark color="#5047e5" variant="Bold" />,
        title: 'Quản lí trang',
    },
    {
        href: '/security',
        icon: <SecuritySafe color="#5047e5" variant="Bold" />,
        title: 'Quản lí bảo mật',
    },
];

export const DashboardSidebar = (props: any) => {
    const { open, onClose } = props;
    const { dataUser } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const router = useRouter();
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false,
    });

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        if (open) {
            onClose?.();
        }
    }, [router.asPath]);

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <div>
                    <Box sx={{ p: 3 }}>
                        <Link href="/home" passHref>
                            <a>
                                <Logo
                                    sx={{
                                        height: 42,
                                        width: 42,
                                    }}
                                />
                            </a>
                        </Link>
                        <Box
                            sx={{
                                color: '#5047e5',
                            }}
                        >
                            <h3>Xin chào {dataUser?.userName}</h3>
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#5047e5',
                        my: 3,
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
                <Box
                    sx={{
                        width: 1,
                        flexGrow: 1,
                        mb: 0.5,
                        py: 0,
                        px: 2,
                    }}
                >
                    <Button
                        className="button-logout"
                        color="primary"
                        onClick={() => {
                            dispatch(logout());
                            router.push('/');
                            toast.info('Đã đăng xuất tài khoản');
                        }}
                    >
                        Đăng xuất
                    </Button>
                </Box>
            </Box>
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    width: 280,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Home, Category, Bookmark, SecuritySafe } from 'iconsax-react';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';

import { Logo } from './logo';
import { NavItem } from './item';
import { RootState } from '../../../redux/reducers';

const items = [
    {
        href: '/home',
        icon: <Home size="24" color="#0060ff" variant="Bold" />,
        title: 'Trang chủ',
        tabList: [],
    },
    {
        href: '/category',
        icon: <Category color="#0060ff" variant="Bold" />,
        title: 'Quản lí danh mục',
        tabList: [
            {
                href: '/category/location',
                txt: 'Khu vực',
            },
            {
                href: '/category/classify',
                txt: 'Phân loại',
            },
            {
                href: '/category/layer',
                txt: 'Lớp bản đồ',
            },
        ],
    },
    {
        href: '/page',
        icon: <Bookmark color="#0060ff" variant="Bold" />,
        title: 'Quản lí trang',
        tabList: [
            {
                href: '/page/setting',
                txt: 'Cấu hình',
            },
            {
                href: '/page/display',
                txt: 'Giao diện ',
            },
            {
                href: '/page/language',
                txt: 'Ngôn ngữ',
            },
        ],
    },
    {
        href: '/security',
        icon: <SecuritySafe color="#0060ff" variant="Bold" />,
        title: 'Quản lí bảo mật',
        tabList: [],
    },
];

export const DashboardSidebar = (props: any) => {
    const { open, onClose } = props;
    const { dataUser, permission } = useSelector(
        (state: RootState) => state.auth
    );

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
                                color: '#0060ff',
                            }}
                        >
                            <h3>Xin chào {dataUser?.userName}</h3>
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#0060ff',
                        my: 3,
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => {
                        /*---------- Kiểm tra nếu tài khoản có role lớn hơn 1 hiển thị nút truy cập trang bảo mật ----------*/
                        if (item.href === '/security') {
                            if (permission?.role >= 1) {
                                return (
                                    <NavItem
                                        key={item.title}
                                        icon={item.icon}
                                        href={item.href}
                                        tabList={item.tabList}
                                        title={item.title}
                                    />
                                );
                            }

                            return null;
                        } else {
                            return (
                                <NavItem
                                    key={item.title}
                                    icon={item.icon}
                                    href={item.href}
                                    tabList={item.tabList}
                                    title={item.title}
                                />
                            );
                        }
                    })}
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

import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { ArrowLeft } from 'iconsax-react';
import { AiOutlineLogout } from 'react-icons/ai';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { toast } from 'react-toastify';

import { UserCircle as UserCircleIcon } from '../../../constants/icons/user-circle';
import { logout } from '../../../redux/actions/auth';
import style from './NavBar.module.scss';
import Popup from '../../site/Popup';
import { useState } from 'react';

const DashboardNavbarRoot = styled(AppBar)(({ theme }: any) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = ({
    onSidebarOpen,
    title,
    hrefBack,
    ...props
}: any) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [showLogout, setShowLogout] = useState<boolean>(false);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
        toast.info('Đã đăng xuất tài khoản');
    };

    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    left: {
                        lg: 280,
                    },
                    width: {
                        lg: 'calc(100% - 280px)',
                    },
                }}
                {...props}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2,
                    }}
                >
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{
                            display: {
                                xs: 'inline-flex',
                                lg: 'none',
                            },
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ color: '#0060ff' }}>
                        {hrefBack ? (
                            <Link href={hrefBack}>
                                <a>
                                    <Box sx={{ display: 'flex' }}>
                                        <ArrowLeft
                                            size="28"
                                            variant="Outline"
                                        />
                                        <Box sx={{ paddingLeft: '20px' }}>
                                            <h3>{title}</h3>
                                        </Box>
                                    </Box>
                                </a>
                            </Link>
                        ) : (
                            <h3>{title}</h3>
                        )}
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        className={style.main}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Avatar
                            sx={{
                                height: 40,
                                width: 40,
                                ml: 1,
                            }}
                        >
                            <UserCircleIcon fontSize="small" />
                        </Avatar>
                        <Box
                            sx={{
                                width: 1,
                                flexGrow: 1,
                                mb: 0.5,
                                py: 0,
                                px: 2,
                                position: 'relative',
                            }}
                        >
                            <div className={style.mainMenu}>
                                <div className={style.menu}>
                                    <div
                                        className={style.item}
                                        onClick={() => setShowLogout(true)}
                                    >
                                        <span className={style.icon}>
                                            <AiOutlineLogout />
                                        </span>
                                        <p>Đăng xuất</p>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Toolbar>
            </DashboardNavbarRoot>
            <Popup isShow={showLogout} onClose={() => setShowLogout(false)}>
                <div className={style.popupContainer}>
                    <div className={style.popup}>
                        <p>Bạn chắn chắc muốn đăng xuất?</p>
                        <div className={style.groupbtn}>
                            <div
                                className={style.btn}
                                onClick={() => setShowLogout(false)}
                            >
                                Hủy
                            </div>
                            <div className={style.btn} onClick={handleLogout}>
                                Đăng xuất
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func,
    title: PropTypes.any,
    hrefBack: PropTypes.string,
};

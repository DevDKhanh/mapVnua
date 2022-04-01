import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ArrowLeft } from 'iconsax-react';
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { UserCircle as UserCircleIcon } from '../../../constants/icons/user-circle';
import Link from 'next/link';

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
                    <Box sx={{ color: '#5047e5' }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            sx={{
                                height: 40,
                                width: 40,
                                ml: 1,
                            }}
                        >
                            <UserCircleIcon fontSize="small" />
                        </Avatar>
                    </Box>
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func,
    title: PropTypes.any,
    hrefBack: PropTypes.string,
};

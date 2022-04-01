import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from '../NavBar';
import { DashboardSidebar } from '../SideBar';
import RequireAuth from '../../protected/requiredAuth';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280,
    },
}));

export const DashboardLayout = (props: any) => {
    const { children } = props;
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <RequireAuth>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%',
                        padding: '20px',
                    }}
                >
                    {props?.isNotReady ? (
                        <h1>Chức năng này chưa sẵn sàng</h1>
                    ) : (
                        children
                    )}
                </Box>
            </DashboardLayoutRoot>
            <DashboardNavbar
                onSidebarOpen={() => setSidebarOpen(true)}
                title={props?.title}
                hrefBack={props?.hrefBack}
            />
            <DashboardSidebar
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
            />
        </RequireAuth>
    );
};

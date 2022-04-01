import * as React from 'react';
import { useDispatch } from 'react-redux';
import { DashboardLayout } from '../components/widgets/Layout';

import Lottie from 'react-lottie';
import * as animationData from '../assets/anim/74218-world-map.json';
import { Box } from '@mui/material';

export default function Homepage() {
    const dispatch = useDispatch();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (
        <DashboardLayout title="Trang chủ">
            <Box sx={{ padding: 5 }}>
                <Lottie options={defaultOptions} height={450} width={650} />
                <Box sx={{ textAlign: 'center', my: 3, color: '#5047e5' }}>
                    <h1>Chào mừng bạn trở lại!</h1>
                </Box>
            </Box>
        </DashboardLayout>
    );
}

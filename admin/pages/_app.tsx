import '../styles/globals.css';
import "tippy.js/dist/tippy.css";
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';

import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import LoadingTopBar from '../components/site/LoadingTopBar';
import { Provider } from 'react-redux';
import SplashScreen from '../components/protected/splashScreen';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import store from '../redux/store';
import { theme } from '../constants/theme';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SplashScreen>
                    <LoadingTopBar />
                    <ToastContainer />
                    <Component {...pageProps} />
                </SplashScreen>
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;

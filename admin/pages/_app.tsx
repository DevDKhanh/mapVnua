import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import SplashScreen from '../components/protected/splashScreen';
import { theme } from '../constants/theme';
import store from '../redux/store';
import 'leaflet/dist/leaflet.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SplashScreen>
                    <ToastContainer />
                    <Component {...pageProps} />
                </SplashScreen>
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;

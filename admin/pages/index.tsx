import * as React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import authAPI from '../api/auth';
import { login } from '../redux/actions/auth';
import RequiredLogout from '../components/protected/requiredLogout';
import { useRouter } from 'next/router';

export default function Homepage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userName: any = data.get('username');
        const password: any = data.get('password');
        if (!userName || !password) {
            toast.warn('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        (async () => {
            try {
                const [res, status]: any = await authAPI.login({
                    userName,
                    password,
                });

                if (res && status === 201) {
                    const { token, ...data } = res.data;
                    dispatch(login({ token, dataUser: data }));
                    toast.success('Đăng nhập thành công!');
                    router.push('/home');
                } else {
                    toast.warn(res?.message || 'Đăng nhập không thành công');
                }
            } catch (err: any) {
                toast.warn(err?.message || 'Đã có lỗi xảy ra');
            }
        })();
    };

    return (
        <RequiredLogout>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập hệ thống
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Tên đăng nhập"
                            name="username"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </RequiredLogout>
    );
}

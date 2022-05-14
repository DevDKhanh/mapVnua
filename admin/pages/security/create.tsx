import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import authAPI from '../../api/auth';

import languageAPI from '../../api/language';
import uploadAPI from '../../api/upload';
import { useValidateAll } from '../../common/hooks/useValidate';
import RequiredPermision from '../../components/protected/requiredPermision';
import Input from '../../components/site/Input';
import { DashboardLayout } from '../../components/widgets/Layout';
import { RootState } from '../../redux/reducers';

/*---------- type form input ----------*/
interface typeForm {
    fullName: string;
    userName: string;
    password: any;
    role: string;
}

/*===========> MAIN COMPONENT <==========*/
function Index() {
    const validator = useValidateAll;
    const router = useRouter();

    const [dataForm, setDataForm] = useState<typeForm>({
        fullName: '',
        userName: '',
        password: '',
        role: '0',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDataForm((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!validator(dataForm)) {
            toast.warn('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        (async () => {
            try {
                const [res, status]: any = await authAPI.register(dataForm);
                if (res && status === 201) {
                    router.push('/security');
                    toast.success(res?.message);
                } else {
                    toast.warn(res?.message);
                }
            } catch (err) {
                toast.error('Đã xảy ra lỗi vui lòng đăng nhập lại');
            }
        })();
    };

    return (
        <DashboardLayout title="Thêm tài khoản" hrefBack="/security/">
            <div>
                <RequiredPermision role={1}>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <Input
                                title="Họ và tên"
                                value={dataForm?.fullName}
                                name="fullName"
                                onChange={handleChange}
                            />
                            <Input
                                title="Tên tài khoản"
                                value={dataForm?.userName}
                                name="userName"
                                onChange={handleChange}
                            />
                            <Input
                                title="Mật khẩu"
                                value={dataForm?.password}
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                            <Input
                                title="Cấp độ tài khoản"
                                value={dataForm?.role}
                                type="number"
                                name="role"
                                onChange={handleChange}
                            />
                            <button className="btn-create">
                                Tạo tài khoản
                            </button>
                        </form>
                    </div>
                </RequiredPermision>
            </div>
        </DashboardLayout>
    );
}

export default memo(Index);

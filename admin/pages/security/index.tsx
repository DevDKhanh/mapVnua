import { DashboardLayout } from '../../components/widgets/Layout';

function index() {
    return (
        <DashboardLayout title="Quản lí bảo mật" isNotReady>
            <div className="main"></div>
        </DashboardLayout>
    );
}

export default index;

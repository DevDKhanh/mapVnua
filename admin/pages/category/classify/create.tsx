import { memo } from 'react';
import { DashboardLayout } from '../../../components/widgets/Layout';

function index() {
    return <DashboardLayout title="Phân loại"></DashboardLayout>;
}

export default memo(index);

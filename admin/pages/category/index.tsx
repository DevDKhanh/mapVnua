import { Location, Grid3, Layer } from 'iconsax-react';
import ItemLink from '../../components/site/ItemLink';
import { DashboardLayout } from '../../components/widgets/Layout';

function Index() {
    return (
        <DashboardLayout title="Quản lí danh mục">
            <div className="main">
                <div className="list-grid">
                    <ItemLink
                        Icon={Location}
                        title="Quản lí khu vực"
                        href="/category/location"
                    />
                    <ItemLink
                        Icon={Grid3}
                        title="Phân loại"
                        href="/category/classify"
                    />
                    <ItemLink
                        Icon={Layer}
                        title="Lớp bản đồ"
                        href="/category/layer"
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Index;

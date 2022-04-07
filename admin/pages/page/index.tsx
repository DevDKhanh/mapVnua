import { Setting3, Screenmirroring, LanguageSquare } from 'iconsax-react';
import ItemLink from '../../components/site/ItemLink';
import { DashboardLayout } from '../../components/widgets/Layout';

function Index() {
    return (
        <DashboardLayout title="Quản lí trang">
            <div className="main">
                <div className="list-grid">
                    <ItemLink
                        Icon={Setting3}
                        title="Cấu hình"
                        href="/page/setting"
                    />
                    <ItemLink
                        Icon={Screenmirroring}
                        title="Giao diện"
                        href="/page/display"
                    />
                    <ItemLink
                        Icon={LanguageSquare}
                        title="Ngôn ngữ"
                        href="/page/language"
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Index;

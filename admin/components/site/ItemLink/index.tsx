import style from './ItemLink.module.scss';
import Link from 'next/link';
import { ArrowRight } from 'iconsax-react';

function index({ Icon, title, href }: any) {
    return (
        <Link href={href}>
            <a className={style.item}>
                <div className={style.header}>
                    <div>
                        <Icon size="32" color="#FF8A65" variant="Bold" />
                    </div>
                </div>
                <div className={style.footer}>
                    <h4>{title}</h4>
                    <div>
                        <ArrowRight size="32" color="#FF8A65" />
                    </div>
                </div>
            </a>
        </Link>
    );
}

export default index;

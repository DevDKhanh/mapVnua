import TabLanguage from '../TabLanguage';
import TabArea from '../TabArea';
import style from './Menu.module.scss';

function Menu() {
    return (
        <div className={style.menu}>
            <TabLanguage />
            <TabArea />
        </div>
    );
}

export default Menu;

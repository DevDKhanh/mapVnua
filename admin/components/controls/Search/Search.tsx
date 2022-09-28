import { RiSearch2Line } from 'react-icons/ri';
import styles from './Search.module.scss';

function Search({ placeholder, name, onChange }: any) {
    return (
        <div className={styles.container}>
            <RiSearch2Line />
            <input
                type="text"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
            />
        </div>
    );
}

export default Search;

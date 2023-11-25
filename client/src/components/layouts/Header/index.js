import { API } from "../../../constant/config";
import Marquee from "react-fast-marquee";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";

function Header() {
  const { setting } = useSelector((state) => state.dataMap);
  const [settingMap] = setting;

  return (
    <header className={styles.container}>
      <img
        className={styles.logo}
        src={API + "/upload" + settingMap.icon}
        alt="logo "
      />
      <h1>{settingMap?.title}</h1>
      <div className={styles.groupText}>
        <Marquee>
          <p className={styles.marqueeText}>{settingMap?.slogan}</p>
        </Marquee>
      </div>
    </header>
  );
}

export default Header;

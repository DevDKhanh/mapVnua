import { API } from "../../../constant/config";
import Marquee from "react-fast-marquee";
import Menu from "../../../components/menu/Menu";
import styles from "./Header.module.scss";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [searchParams] = useSearchParams();
  const diplayHeader = searchParams.get("header");
  const { setting } = useSelector((state) => state.dataMap);
  const [settingMap] = setting;

  return diplayHeader === "false" ? null : (
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
      <Menu />
    </header>
  );
}

export default Header;

import TabArea from "../TabArea";
import TabLanguage from "../TabLanguage";
import clsx from "clsx";
import styles from "./Menu.module.scss";
import { useSearchParams } from "react-router-dom";

function Menu() {
  const [searchParams] = useSearchParams();
  const diplayHeader = searchParams.get("header");
  return (
    <div
      className={clsx(styles.menu, {
        [styles.noneHeader]: diplayHeader === "false",
      })}
    >
      <TabLanguage />
      <TabArea />
    </div>
  );
}

export default Menu;

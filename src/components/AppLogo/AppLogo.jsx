import styles from "./AppLogo.module.scss";
import logo from "../../assets/main-logo.png";
import {Link} from "react-router-dom";

const AppLogo = () => {
  return (
    <Link className={styles.logoWrapper} to='/'>
      <img className={styles.logo} src={logo}></img>
      <span className={styles.logoText}>C-Money</span>
    </Link>
  );
};

export default AppLogo;
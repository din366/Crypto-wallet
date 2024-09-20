import styles from "./AppLogo.module.scss";
import logo from "../../assets/main-logo.png";
import {Link, useNavigate} from "react-router-dom";

const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <Link className={styles.logoWrapper} to='/bills'>
      <img className={styles.logo} src={logo}></img>
      <span className={styles.logoText}>C-Money</span>
    </Link>
  );
};

export default AppLogo;
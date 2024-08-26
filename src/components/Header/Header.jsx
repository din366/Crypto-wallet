import styles from './Header.module.scss';
import AppLogo from "../AppLogo/AppLogo.jsx";
import Navigation from "./Navigation/Navigation.jsx";
import {getToken, logout} from "../../store/login/loginSlice.js";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
  const token = useSelector(getToken);

  return (
    <div className={styles.headerWrapper}>
      <div className='container'>
        <div className={styles.header}>
          <AppLogo />
          <Navigation token={token} logout={logout}/>
        </div>
      </div>
    </div>
  );
};

export default Header;
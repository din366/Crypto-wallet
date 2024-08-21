import styles from './Header.module.scss';
import AppLogo from "../AppLogo/AppLogo.jsx";
import Navigation from "./Navigation/Navigation.jsx";


const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className='container'>
        <div className={styles.header}>
          <AppLogo />
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Header;
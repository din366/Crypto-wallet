import styles from './Header.module.scss';
import logo from './../../assets/main-logo.png'
import NavigateButton from "../NavigateButton/NavigateButton.jsx";


const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className='container'>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={logo}></img>
            <span className={styles.logoText}>C-Money</span>
          </div>
          <div className={styles.navigateWrapper}>
            <NavigateButton text={'Log in'}></NavigateButton> {/* ! redux no login var*/}

            <NavigateButton text={'Счета'}></NavigateButton> {/* ! redux login var */}
            <NavigateButton text={'Обмен'}></NavigateButton>
            <NavigateButton text={'Выйти'} iconName={'logout'}></NavigateButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
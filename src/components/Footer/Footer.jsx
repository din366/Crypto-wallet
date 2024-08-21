import AppLogo from "../AppLogo/AppLogo.jsx";
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div>
      <div className={styles.footerWrapper}>
        <div className="container">
          <div className={styles.footerBlock}>
            <AppLogo />
            <span className={styles.companyName}>© C-Money, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
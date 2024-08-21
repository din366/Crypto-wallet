import styles from './NavigateButton.module.scss';
import logout from './icons/logout.png';
import {NavLink} from "react-router-dom";
const NavigateButton = ({text, func, iconName, link}) => {
  let icon = null;
  switch (iconName) {
    case 'logout':
      icon = logout;
      break;
    default:
      icon = null;
  }


  return (
      <NavLink className={styles.button} to={`/${link ? link : ''}`}>
        {text}
        {icon ? <img className={styles.img} src={icon} alt=""/> : null}
      </NavLink>
  );
};

export default NavigateButton;
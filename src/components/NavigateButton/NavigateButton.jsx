import styles from './NavigateButton.module.scss';
import logout from './icons/logout.png';
const NavigateButton = ({text, func, iconName}) => {
  let icon = null;
  switch (iconName) {
    case 'logout':
      icon = logout;
      break;
    default:
      icon = null;
  }


  return (
      <button className={styles.button} onClick={() => {func()}}>
        {text}
        {icon ? <img className={styles.img} src={icon} alt=""/> : null}
      </button>
  );
};

export default NavigateButton;
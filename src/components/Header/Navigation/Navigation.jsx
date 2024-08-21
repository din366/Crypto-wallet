import styles from "./Navigation.module.scss"
import NavigateButton from "../../NavigateButton/NavigateButton.jsx";

const Navigation = () => {
  return (
    <div className={styles.navigateWrapper}>
      <NavigateButton text={'Log in'} link='login'></NavigateButton> {/* ! redux no login var*/}

      <NavigateButton text={'Счета'} link='bills'></NavigateButton> {/* ! redux login var */}
      <NavigateButton text={'Обмен'} link='exchange'></NavigateButton>
      <NavigateButton text={'Выйти'} iconName='logout'></NavigateButton>
    </div>
  );
};

export default Navigation;
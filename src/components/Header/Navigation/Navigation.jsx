import styles from "./Navigation.module.scss"
import NavigateButton from "../../NavigateButton/NavigateButton.jsx";
import {useDispatch} from "react-redux";
import {logout} from "../../../store/login/loginSlice.js";

const Navigation = ({token}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.navigateWrapper}>
      {token ? <>
        <NavigateButton link='bills'>Счета</NavigateButton>
        <NavigateButton link='exchange'>Обмен</NavigateButton>
        <NavigateButton
          iconName='logout'
          onClick={
            () => {dispatch(logout())
          }
        }>Выйти</NavigateButton>
      </> : <NavigateButton link='login'>Log in</NavigateButton>
      }
    </div>
  );
};

export default Navigation;
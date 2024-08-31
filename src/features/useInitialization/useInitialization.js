import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setToken} from "../../store/login/loginSlice.js";

export const useInitialization = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(setToken(localStorage.getItem("token")));
    }
  }, []);
}
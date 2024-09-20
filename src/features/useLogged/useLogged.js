import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getToken} from "../../store/login/loginSlice.js";

export const useLogged = () => {
  const navigate = useNavigate();
  const token = useSelector(getToken);

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== null) {
      navigate('/bills');
    } else {
      navigate('/login');
    }
  }, [token]);
}
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const useLogged = () => {
  const navigate = useNavigate();
  const token = useSelector(state => state.login.token);

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== null) {
      navigate('/bills');
    }
  }, [token]);
}
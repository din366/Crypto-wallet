import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const useLogged = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== null) {
      navigate('/bills');
    }
  }, []);
}
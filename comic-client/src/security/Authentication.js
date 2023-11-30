import Cookies from 'js-cookie';

export const checkAuth = () => {
    // console.log(Cookies.get("access_token"));
    if (Cookies.get("access_token") != null) return true;
    return false;
  };

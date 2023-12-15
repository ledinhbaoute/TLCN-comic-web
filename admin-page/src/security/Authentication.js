import Cookies from 'js-cookie';

export const checkAuth = () => {
    if (Cookies.get("access_token") != null) return true;
    return false;
  };

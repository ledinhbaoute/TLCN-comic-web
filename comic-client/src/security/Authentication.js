import Cookies from 'js-cookie';

export const checkAuth = () => {
  // console.log(Cookies.get("access_token"));
  if (window.sessionStorage.getItem("userid") != null) return true;
  return false;
};

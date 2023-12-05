import React, { useEffect,  useContext } from "react";
// import "../sass/style.scss";
// import "../css/AllStyles";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkAuth } from "../security/Authentication";
import AppContext from "../context/AppContext";

const Header = () => {
  const appContext = useContext(AppContext);

  const logoUrl = `${process.env.PUBLIC_URL}/images/logo.png`;

  const [keyWord, setKeyWord] = useState("");
  const [searchingList, setSearchingList] = useState([]);

  const handleKeyWordChange = async (event) => {
    setKeyWord(event.target.value);

    try {
      const response = await axios.get(
        `${API_URL}/search/comics?keySearch=${keyWord}`
      );
      setSearchingList(response.data.data);
      console.log(searchingList);
    } catch (error) {
      console.log(error);
    }
  };

  // const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("access_token");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
    window.scrollTo({
      top: 0,
    });
  };
<<<<<<< HEAD

  const handleSearchSubmit = () => {};

=======
>>>>>>> e833aff08990548a7b4605313abe36c143c8434a
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(`${API_URL}/genres`);
    //     setGenres(response.data.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchData();
    // setGenres(appContext.genres);
    checkAuth();
    //console.log(appContext.genres)
  }, []);

<<<<<<< HEAD
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <Link to="./">
                <img
                  src={logoUrl}
                  alt=""
                  style={{ maxWidth: "93", maxHeight: "23" }}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li>
                    <NavLink to="./" activeclassname="active">
                      Trang chủ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="./genres" activeclassname="active">
                      Thể loại <span className="arrow_carrot-down"></span>
                    </NavLink>
                    <ul className="dropdown">
                      <li>
                        {appContext.map((item) => (
                          <Link
                            to={{ pathname: `./genres/${item.id}/1` }}
                            key={item.id}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </li>
                      <li>
                        <Link to="./comic-detail">Comic Details</Link>
                      </li>
                      <li>
                        <Link to="./anime-watching.html">Anime Watching</Link>
                      </li>
                      <li>
                        <Link to="./register">Sign Up</Link>
                      </li>
                      <li>
                        <Link to="./login">Login</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="header__right">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  id="keyWord"
                  placeholder="Tìm kiếm"
                  value={keyWord}
                  onChange={handleKeyWordChange}
                />
                <button className="icon_search" type="submit"></button>
              </form>
              <Link to="./search" className="search-switch">
                <span className="icon_search"></span>
              </Link>
              { (keyWord !="" && searchingList!= []) && (
                <ul className="dropdown">
                  <li>
                    {searchingList.map((item) => (
                      <Link to={{pathname: `./comic-detail/${item.id}`}} key={item.id}>{item.name}</Link>
                    ))}
                  </li>
                </ul>
              )}
              {checkAuth() ? (
                <a>
                  <Link to="./profile">
                    <span className="icon_profile"></span>
                  </Link>
                  <Link to="./">
                    <span
                      title="Đăng xuất"
                      onClick={handleLogout}
                      className="icon_close_alt"
                    ></span>
                  </Link>
                </a>
              ) : (
                <Link to="./login">
                  <span className="icon_profile"></span>
                </Link>
              )}
=======
  return (      
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className="header__logo">
                <Link to="./">
                  <img
                    src={logoUrl}
                    alt=""
                    style={{ maxWidth: "93", maxHeight: "23" }}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="header__nav">
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li>
                      <NavLink to="./" activeclassname="active">
                        Trang chủ
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="./genres" activeclassname="active">
                        Thể loại <span className="arrow_carrot-down"></span>
                      </NavLink>
                      <ul className="dropdown">
                        <li>
                          {appContext.map((item) => (
                            <Link
                              to={{ pathname: `./genres/${item.id}/1` }}
                              key={item.id}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </li>
                      
                     
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="header__right">
                <Link to="./search" className="search-switch">
                  <span className="icon_search"></span>
                </Link>
                {checkAuth() ? (
                  <>
                    <Link to="./profile">
                      <span className="icon_profile"></span>
                    </Link>
                    <Link to="./">
                      <span
                        title="Đăng xuất"
                        onClick={handleLogout}
                        className="icon_close_alt"
                      ></span>
                    </Link>
                  </>
                ) : (
                  <Link to="./login">
                    <span className="icon_profile"></span>
                  </Link>
                )}
              </div>
>>>>>>> e833aff08990548a7b4605313abe36c143c8434a
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
};

export default Header;

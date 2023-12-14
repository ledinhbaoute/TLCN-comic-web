import React, { useState, useEffect, useContext } from "react";
// import "../sass/style.scss";
// import "../css/AllStyles";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkAuth } from "../security/Authentication";
import AppContext from "../context/AppContext";
import axios from "axios";
import API_URL from "../config/config";
import ReactSearchBox from "react-search-box";
import SearchResutlItem from "./SearchResultItem";

const Header = () => {
  const appContext = useContext(AppContext);

  const logoUrl = `${process.env.PUBLIC_URL}/images/logo.png`;

  const [keyWord, setKeyWord] = useState("");
  const [searchingList, setSearchingList] = useState([]);
  useEffect(() => {
    if (keyWord !== "") {
      searchComic(keyWord)
      console.log(searchingList);
    }
  }
    , [keyWord]);

  const handleKeyWordChange = (event) => {
    setKeyWord(event.target.value);
  }

  // try {
  //   const response = await axios.get(
  //     `${API_URL}/search/comics?keySearch=${keyWord}`
  //   );
  //   setSearchingList(response.data.data);
  //   setData(searchingList.map((item) => ({
  //     key: item.id,
  //     value: item.name
  //   })))
  //   console.log(searchingList);
  // } catch (error) {
  //   console.log(error);
  // }
  // };
  const searchComic = async (keyS) => {

    try {
      const response = await axios.get(
        `${API_URL}/search/comics?keySearch=${keyS}`
      );
      setSearchingList(response.data.data);


    } catch (error) {
      console.log(error);
    }
  };

  // const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("access_token");
    window.sessionStorage.clear();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    window.location.reload();
    window.scrollTo({
      top: 0,
    });
  };

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
                  <li>
                  </li>
                  <li>
                    <NavLink to="./favorite-comic" activeclassname="active">
                      Ưa thích
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="./history-reading" activeclassname="active">
                      Lịch sử
                    </NavLink>
                  </li>
                  <li>
                    {/* <ReactSearchBox
                      leftIcon={<>🔎</>}
                      iconBoxSize="28px"
                      placeholder="Search Here..."
                      data={
                        transformedArray
                      }
                      onChange={handleKeyWordChange}
                    /> */}

                    <input className="searchTerm" type="text" placeholder="Search Here..." onChange={handleKeyWordChange}></input>
                    {(keyWord != "" && searchingList != []) && (

                      <ul className="dropdown-search">
                        <li>
                          {searchingList.map((item) => (
                            <SearchResutlItem searchItem={item}></SearchResutlItem>
                          ))}
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">

            <div className="header__right">




              {checkAuth() ? (
                <a>
                  <Link to="./profile">
                    <span className="icon_profile"></span>
                  </Link>
                  <Link to="./">
                    <span
                      title="Đăng xuất"
                      onClick={handleLogout}
                      className="fa fa-sign-out"
                    ></span>
                  </Link>
                </a>
              ) : (
                <Link to="./login">
                  <span className="fa fa-sign-in"></span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
};

export default Header;

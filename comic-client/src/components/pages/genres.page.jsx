import React, { useEffect, useState, useContext } from "react";
import ComicItem from "../ComicItem";
import Breadcrumb from "../Breadcrumb";
import ComicList from "../ComicList";
import Pagination from "../Pagination";
import axios from "axios";
import API_URL from "../../config/config";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
const GenresPage = () => {
  const { genreId, indexPage } = useParams();

  const [comicItems, setComicItems] = useState([]);
  const appContext = useContext(AppContext);
  const [currentGenre, setCurrentGenre] = useState({});
  const [totalPage, setTotalPage] = useState({});
  const [listRamdomComic, setListRamdomComic] = useState([]);
  const [sortBy, setSortBy] = useState("name")

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSortBy(selectedValue);
  };
  
  useEffect(() => {
    const getComicByGenre = async () => {
      try {
        if (genreId) {
          //   console.log(`${API_URL}/comicbooks/filter/genre/${genreId}`);
          const response = await axios.get(
            `${API_URL}/comic/genre/pagination?indexPage=${indexPage - 1}&genreId=${genreId}&sortBy=${sortBy}`
          );
          setComicItems(response.data.content);
          setTotalPage(response.data.totalPages)

        }
      } catch (error) {
        console.log(error);
      }
    };
    getComicByGenre();

  }, [genreId, indexPage, sortBy]);

  useEffect(() => {
    const getRandomComic = async () => {
      try {
       
          const response = await axios.get(
            `${API_URL}/comicbooks`
          );
          setListRamdomComic(response.data.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    getRandomComic();

  }, [genreId, indexPage, sortBy]);

  useEffect(() => {
    setCurrentGenre(appContext.find((genre) => genre.id === genreId));
  },[appContext,genreId])
  return (
    <>
      <Breadcrumb currentGenre={currentGenre}/>
      <section className="product-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="product__page__content">
                <div className="product__page__title">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-6">
                      <div className="section-title">
                        <h4>{currentGenre && currentGenre.name}</h4>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                      <div className="product__page__filter">
                        <p>Order by:</p>
                        <select value={sortBy} onChange={handleOptionChange}>
                          <option value="updateDate">Mới nhất</option>
                          <option value="view">Lượt xem</option>
                          <option value="rate">Đánh giá</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {comicItems.map((item) => (
                    <ComicItem item={item} key={item.id} />
                  ))}
                </div>
              </div>
              <Pagination totalPage={totalPage}  currentGR={genreId} currentPage={indexPage} />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <ComicList title="Có thể bạn sẽ thích" listComic={listRamdomComic} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default GenresPage;

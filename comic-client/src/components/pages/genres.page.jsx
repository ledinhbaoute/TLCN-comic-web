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
  const { genreId } = useParams();
  const [comicItems, setComicItems] = useState([]);
  const appContext = useContext(AppContext);
  const [currentGenre, setCurrentGenre] = useState({});
  

  useEffect(() => {
    const getComicByGenre = async () => {
      try {
        if (genreId) {
          //   console.log(`${API_URL}/comicbooks/filter/genre/${genreId}`);
          const response = await axios.get(
            `${API_URL}/comicbooks/filter/genre/${genreId}`
          );
          setComicItems(response.data.data);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComicByGenre();
    // console.log(currentGenres);
    setCurrentGenre(appContext.genres.find((genre) => genre.id === genreId));
    console.log(appContext);
    console.log(currentGenre.name);
  }, [genreId]);

  return (
    <>
      <Breadcrumb />
      <section className="product-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="product__page__content">
                <div className="product__page__title">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-6">
                      <div className="section-title">
                        <h4>{currentGenre.name}</h4>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                      <div className="product__page__filter">
                        <p>Order by:</p>
                        <select>
                          <option value="">Mới nhất</option>
                          <option value="">Lượt xem</option>
                          <option value="">Đánh giá</option>
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
              <Pagination />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <ComicList />
              <ComicList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default GenresPage;

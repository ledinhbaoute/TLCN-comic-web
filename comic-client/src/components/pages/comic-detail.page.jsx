import ComicDetail from "../ComicDetail";
import Breadcrumb from "../breadcrumb";
import ComicList from "../ComicList";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/config";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Review from "../Review";

const ComicDetailPage = () => {

    const { comicId } = useParams()
    const [comic, setComic] = useState({})
    const [chapterList, setChapterList] = useState([])
    const [ratingList, setRatingList] = useState([])
    useEffect(() => {
        const getComicDetail = async () => {
            try {
                if (comicId) {
                    const response = await axios.get(
                        `${API_URL}/comicbooks/${comicId}`
                    );
                    setComic(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getComicDetail();

    }, [comicId]);

    useEffect(() => {
        const getChapterByComic = async () => {
            try {
                if (comicId) {
                    const response = await axios.get(
                        `${API_URL}/chapters/${comicId}`
                    );
                    setChapterList(response.data.data);
                }

            } catch (error) {
                console.log(error);
            }


        };
        getChapterByComic();

    }, [comicId]);

    useEffect(() => {
        const getRatingByComic = async () => {
            try {
                if (comicId) {
                    const response = await axios.get(
                        `${API_URL}/ratings?comicId=${comicId}`
                    );
                    setRatingList(response.data.data);
                }

            } catch (error) {
                console.log(error);
            }


        };
        getRatingByComic();
    }, [comicId]);
    return (
        <>
            <Breadcrumb currentGenre={comic}/>
            <section className="anime-details spad">
                <div className="container">
                    <ComicDetail comic={comic} />
                    <div className="anime__details__episodes">
                        <div className="section-title">
                            <h5>Danh sách Chapter</h5>
                        </div>
                        {chapterList && chapterList.map((item, index) => (
                            <Link to={`/chapter/${item.id}`} key={index}> Chapter {item.ordinalNumber} </Link>
                        ))}

                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-8">
                            <Review comicId={comicId} ratingList={ratingList}/>
                        </div>
                        {/* <div className="col-lg-4 col-md-4">
                            <ComicList />
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    );
}
export default ComicDetailPage
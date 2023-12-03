import ComicDetail from "../ComicDetail";
import Breadcrumb from "../breadcrumb";
import Review from "../review";
import ComicList from "../ComicList";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/config";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ComicDetailPage = () => {

    const { comicId } = useParams()
    const [comic, setComic] = useState({})
    const [chapterList, setChapterList] = useState([])

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
    return (
        <>
            <Breadcrumb />
            <section className="anime-details spad">
                <div className="container">
                    <ComicDetail comic={comic} />
                    <div className="anime__details__episodes">
                        <div className="section-title">
                            <h5>List Chapter</h5>
                        </div>
                        {chapterList && chapterList.map((item, index) => (
                            <Link to={`/chapter/${item.id}`} key={index}> Chapter {item.ordinalNumber} </Link>
                        ))}

                    </div>
                    <div class="row">
                        <div className="col-lg-8 col-md-8">
                            <Review />
                        </div>
                        <div class="col-lg-4 col-md-4">
                            <ComicList />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ComicDetailPage
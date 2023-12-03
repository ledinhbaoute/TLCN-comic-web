import Breadcrumb from "../breadcrumb";
import Review from "../review";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/config";
import React, { useEffect, useState } from "react";

const ComicReadingPage = () => {
    const { chapterId } = useParams();
    const [imageList, setImageList] = useState([]);
    const [chapterList, setChapterList] = useState([]);

    useEffect(() => {
        const getChapterDetail = async () => {
            try {
                if (chapterId) {
                    const response = await axios.get(
                        `${API_URL}/chapter_images/${chapterId}`
                    );
                    setImageList(response.data.data);
                    console.log(imageList)
                }
            } catch (error) {
                console.log(error);
            }
        };
        getChapterDetail();

    }, [chapterId]);

    useEffect(() => {
        if (imageList.length>0) {
            const comic = imageList[0].chapter.comicBook_Id
            const getChapterByComic = async () => {
                try {

                    const response = await axios.get(
                        `${API_URL}/chapters/${comic.id}`
                    );
                    setChapterList(response.data.data);


                } catch (error) {
                    console.log(error);
                }
            }
            getChapterByComic();
        };

    }, [imageList]);

    return (
        <>
            <Breadcrumb />
            <section className="anime-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="anime__video__player__container">
                                {imageList && imageList.map((item, index) => (
                                    <div className="anime__video__playerr">
                                        <img key={index} src={item.link} alt="aaa" />
                                    </div>
                                ))}

                            </div>

                            <div className="anime__details__episodes">
                                <div className="section-title">
                                    <h5>List Chapter</h5>
                                </div>
                                {chapterList && chapterList.map((item, index) => (
                                    <Link to={`/chapter/${item.id}`} key={index}> Chapter {item.ordinalNumber} </Link>
                                ))}
                                {/* <a href="#">Chap 01</a>
                                <a href="#">Chap 02</a>
                                <a href="#">Chap 03</a>
                                <a href="#">Chap 04</a>
                                <a href="#">Chap 05</a>
                                <a href="#">Chap 06</a>
                                <a href="#">Chap 07</a>
                                <a href="#">Chap 08</a>
                                <a href="#">Chap 09</a>
                                <a href="#">Chap 10</a>
                                <a href="#">Chap 11</a>
                                <a href="#">Chap 12</a>
                                <a href="#">Chap 13</a>
                                <a href="#">Chap 14</a>
                                <a href="#">Chap 15</a>
                                <a href="#">Chap 16</a>
                                <a href="#">Chap 17</a>
                                <a href="#">Chap 18</a>
                                <a href="#">Chap 19</a> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <Review />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ComicReadingPage
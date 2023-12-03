import React from "react";
import ComicDetail from "../ComicDetail";
import Breadcrumb from "../breadcrumb";
import Review from "../review";
import ComicList from "../ComicList";

const ComicReadingPage = () => {
    return (
        <>
            <Breadcrumb />
            <section className="anime-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="anime__video__player__container">
                                <div className="anime__video__playerr">
                                    <img src={`${process.env.PUBLIC_URL}/images/072uwhdbshdbshb.jpg`} alt="aaa" />
                                </div>
                                <div className="anime__video__playerr">
                                    <img src={`${process.env.PUBLIC_URL}/images/072uwhdbshdbshb.jpg`} alt="aaa" />
                                </div>
                            </div>

                            <div className="anime__details__episodes">
                                <div className="section-title">
                                    <h5>List Chapter</h5>
                                </div>
                                <a href="#">Chap 01</a>
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
                                <a href="#">Chap 19</a>
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
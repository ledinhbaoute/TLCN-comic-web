import React from "react";
import ComicDetail from "../ComicDetail";
import Breadcrumb from "../Breadcrumb";
import Review from "../Review";
import ComicList from "../ComicList";
const ComicDetailPage = () => {
    return (
        <>
            <Breadcrumb />
            <section className="anime-details spad">
                <div className="container">
                    <ComicDetail />
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
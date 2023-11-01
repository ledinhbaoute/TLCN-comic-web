import React from "react";
import AnimeDetail from "../animeDetail";
import Breadcrumb from "../breadcrumb";
import Review from "../review";
import AnimeList from "../animeList";
const AnimeDetailPage = () => {
    return (
        <>
            <Breadcrumb />
            <section className="anime-details spad">
                <div className="container">
                    <AnimeDetail />
                    <div class="row">
                        <div className="col-lg-8 col-md-8">
                            <Review />
                        </div>
                        <div class="col-lg-4 col-md-4">
                        <AnimeList />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}
export default AnimeDetailPage
import React from "react";
import AnimeItem from "../animeItem";
import Breadcrumb from "../breadcrumb";
import AnimeList from "../animeList";
import Pagination from "../Pagination";
const GenresPage = () => {
    return (
        <>
            <Breadcrumb />
            <section class="product-page spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="product__page__content">
                                <div class="product__page__title">
                                    <div class="row">
                                        <div class="col-lg-8 col-md-8 col-sm-6">
                                            <div class="section-title">
                                                <h4>Romance</h4>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-6">
                                            <div class="product__page__filter">
                                                <p>Order by:</p>
                                                <select>
                                                    <option value="">A-Z</option>
                                                    <option value="">1-10</option>
                                                    <option value="">10-50</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                    <AnimeItem />
                                </div>
                            </div>
                            <Pagination />
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-8">
                            <AnimeList />
                            <AnimeList />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default GenresPage
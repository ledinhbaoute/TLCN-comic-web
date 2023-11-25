import React from "react";
import ComicItem from "../ComicItem";
import Breadcrumb from "../breadcrumb";
import ComicList from "../ComicList";
import Pagination from "../Pagination";
const GenresPage = () => {
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
                                                <h4>Romance</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6">
                                            <div className="product__page__filter">
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
                                <div className="row">
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
                                    <ComicItem />
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
}
export default GenresPage
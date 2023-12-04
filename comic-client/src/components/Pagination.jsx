import React from "react";

import { Link } from "react-router-dom";
const Pagination = (props) => {
    const numbers = Array.from({ length: props.totalPage }, (_, index) => index + 1);
    const currentGenre = props.currentGR
    const listBy = props.listBy
    return (
        <div className="product__pagination">
            {currentGenre ? (
                <ul>
                    {parseInt(props.currentPage) > 1 ? (
                        <Link to={`/genres/${currentGenre}/${props.currentPage - 1}`}><i className="fa fa-angle-double-left"></i></Link>
                    ) : (<Link to={`/genres/${currentGenre}/${props.currentPage}`}><i className="fa fa-angle-double-left"></i></Link>)}

                    {numbers.map(number => (


                        <Link to={`/genres/${currentGenre}/${number}`} key={number} className={number === parseInt(props.currentPage) ? "current-page" : ""}>{number}
                        </Link>
                    ))}
                    {parseInt(props.currentPage) < numbers.length ? (
                        <Link to={`/genres/${currentGenre}/${parseInt(props.currentPage) + 1}`}><i className="fa fa-angle-double-right"></i></Link>
                    ) : (<Link to={`/genres/${currentGenre}/${props.currentPage}`}><i className="fa fa-angle-double-right"></i></Link>)}

                </ul>
            ) : ""}

            {listBy ? (<ul>
                {parseInt(props.currentPage) > 1 ? (
                    <Link to={`/comic/${listBy}/${props.currentPage - 1}`}><i className="fa fa-angle-double-left"></i></Link>
                ) : (<Link to={`/comic/${listBy}/${props.currentPage}`}><i className="fa fa-angle-double-left"></i></Link>)}

                {numbers.map(number => (


                    <Link to={`/comic/${listBy}/${number}`} key={number} className={number === parseInt(props.currentPage) ? "current-page" : ""}>{number}
                    </Link>
                ))}
                {parseInt(props.currentPage) < numbers.length ? (
                    <Link to={`/comic/${listBy}/${parseInt(props.currentPage) + 1}`}><i className="fa fa-angle-double-right"></i></Link>
                ) : (<Link to={`/genres/${listBy}/${props.currentPage}`}><i className="fa fa-angle-double-right"></i></Link>)}

            </ul>

            ) : ""}

        </div>

    )
}
export default Pagination;
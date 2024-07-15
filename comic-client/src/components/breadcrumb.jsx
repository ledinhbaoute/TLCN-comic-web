import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb=(props)=>{
    const currentGenre=props.currentGenre
    return(
        <div className="breadcrumb-option">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__links">
                        <Link to="/" ><i className="fa fa-home"></i> Home</Link>
                        {/* <a href="./categories.html">Categories</a> */}
                        <span>{currentGenre&&currentGenre.name}</span>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    )
}
export default Breadcrumb;
import React from "react";
import ReactDOM from 'react-dom/client';
function getImageUrl(imageName){
    return `${process.env.PUBLIC_URL}/images/sidebar/`+imageName
}
const ComicList=()=>{
  
    return(
        
        <div className="anime__details__sidebar">
            <div className="section-title">
                <h5>you might like...</h5>
            </div>
            <div className="product__sidebar__view__item set-bg" style={{backgroundImage:`url(${getImageUrl("tv-1.jpg")})`}}>
                <div className="ep">18 / ?</div>
                <div className="view"><i className="fa fa-eye"></i> 9141</div>
                <h5><a href="#">Boruto: Naruto next generations</a></h5>
            </div>
            <div className="product__sidebar__view__item set-bg"style={{backgroundImage:`url(${getImageUrl("tv-2.jpg")})`}}>
                <div className="ep">18 / ?</div>
                <div className="view"><i className="fa fa-eye"></i> 9141</div>
                <h5><a href="#">The Seven Deadly Sins: Wrath of the Gods</a></h5>
            </div>
            <div className="product__sidebar__view__item set-bg" style={{backgroundImage:`url(${getImageUrl("tv-3.jpg")})`}}>
                <div className="ep">18 / ?</div>
                <div className="view"><i className="fa fa-eye"></i> 9141</div>
                <h5><a href="#">Sword art online alicization war of underworld</a></h5>
            </div>
            <div className="product__sidebar__view__item set-bg" style={{backgroundImage:`url(${getImageUrl("tv-4.jpg")})`}}>
                <div className="ep">18 / ?</div>
                <div className="view"><i className="fa fa-eye"></i> 9141</div>
                <h5><a href="#">Fate/stay night: Heaven's Feel I. presage flower</a></h5>
            </div>
        </div>
    
    )
}
// const root = ReactDOM.createRoot(document.getElementById('animeList'));
// root.render(
//   <React.StrictMode>
//     <AnimeList/>
//   </React.StrictMode>);
export default ComicList;
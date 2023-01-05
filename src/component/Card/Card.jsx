import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  // console.log(item);
  return (
    
    <Link to={`/product/${item.id}`} className="link" >
      <div className="card">
        <div className="image">
          {/* if the image has an attribute if isNew then the span will be placed */}
          {item?.attributes.isNew && <span>New Season</span>}
          {/* this long code here is how we upload our image to be displayed on the browser, we get the data image from strapi */}
          <img src={process.env.REACT_APP_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url} alt='' className='mainImg' />
          <img src={process.env.REACT_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url} alt='' className='secondImg' />
        </div>
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
          {/* this means that if the price has an old price then display or if it doesnt have then make a default price which is the addition of every price by 20 */}
          <h3>${item.oldPrice || item?.attributes.price + 20}</h3>
          <h3>${item?.attributes.price}</h3>
        </div>
      </div>
    </Link>

  );
};

export default Card;
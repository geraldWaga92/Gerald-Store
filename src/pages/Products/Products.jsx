import React, { useState } from "react";
import List from "../../component/List/List";
import { useParams } from "react-router-dom";
import "./products.scss";
import useFetch from "../../hooks/useFetch";
// import { useFetch } from "../../hooks/useFetch";

const Products = () => {
  //we use parseInt to make the id an integer
  const catId = parseInt(useParams().id); 
  // this will control our filter by price component
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
    const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`);

  // console.log(data);

    const handleChange = (e) => {
      const value = e.target.value;
      // checked wether the checkbox is check
      const isChecked = e.target.checked;

      // when clicked the isChecked becomes true then we display the id value of the selectedSubCats and if not check then we filter
      //the selectedSubCats value then make the item equal to not a value so that it will not display the item
      setSelectedSubCats(
        isChecked
          ? [...selectedSubCats, value]
          : selectedSubCats.filter((item) => item !== value)
      );
    };
    console.log(selectedSubCats);

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={handleChange}/>
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
          ))}
       
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}/>
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort('asc')}
             
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort('desc')}
              
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://p1.pxfuel.com/preview/8/35/802/green-plants-landscape-wall-rocks-blocks-royalty-free-thumbnail.jpg"
          alt=""
        />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} />
      </div>
    </div>
  );
};
export default Products;
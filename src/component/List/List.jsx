import React from "react";
import "./list.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
// import { useFetch } from "../../hooks/useFetch";


const List = ({ catId, maxPrice, sort, subCats }) => {


  const { data, loading, error } = useFetch(
    // this code here will populate with image of the categories and the second line will filter the categories or type of the product and last
    //line will filter the ascending and descending order
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) =>`&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}
    &sort=price:${sort}`
  );



  return (
    <div className="list">
      {loading ? "loading" : data?.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List; 
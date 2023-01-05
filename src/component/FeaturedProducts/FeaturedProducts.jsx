import React from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../Card/Card";
import "./featuredProducts.scss";
// import { useFetch } from "../../hooks/useFetch";
// import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type }) => {

  const { data, error, loading } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );


    

  // ---- we comment now this line because we now have 'useFetch.js' component to handle fetching of data ---
  // useEffect(() => {
  //   const fetchData = async () => {

  //     try {
  //       //this will filter our products to display only the category fitted in the desc by using our strapi filtering method'
  //       const res = await axios.get(process.env.REACT_APP_API_URL+`/products?populate=*&[filters][type][$eq]=${type}`, {
  //         // we need this header property to connect with our strapi api and use our saved items
  //         headers: {
  //           Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
  //         },
  //       })
  //       // we need to write re.data.data for the image to display
  //       setData(res.data.data)
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   }
  //   fetchData();
  // }, []);

   
    return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="bottom">
        {/* wrap our Card item with if there is an error and if it is loading and finally we map the data, we must put '?' here for our 
        products to display */}
        { error ? 'Something went wrong!' : loading ? 'loading' 
        : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
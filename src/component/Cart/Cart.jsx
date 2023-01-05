import React from "react";
import "./cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);//this cart.products comes from store.js cart: cartReducer
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    // our total price of our products will be the item.quantity times our item.price
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    // this is to prevent the total sum from having too many decimals so here we only want 2 decimals after the fixed price number
    return total.toFixed(2);
  };

  //our key here is our public key from stripe
  const stripePromise = loadStripe(
    "pk_test_51LwmXfDmCX18xDqOAXe7cUm1IaLpzlRSuRAwG6w6E5Za0eRCSoNc9qSiw6jF79rZmo2avu0XPOmfckbcCyKVnUti00QMMlqHoO"
  );

  //our payment function
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      //here we use our makeRequest url baseline to post items to our orders endpoint
      const res = await makeRequest.post("/orders", {
        //and it is our product that we want to post
        products,
      });
      //this will redirect to our checkout function so that we can begin our payment
      await stripe.redirectToCheckout({
        //our sessionId property consist of our res data from our orders endpoint and  the stripeSession id inside of our orders endpoint
        sessionId: res.data.stripeSession.id,
      });

    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            {/* this substring here which is the description of the producy we want only to show a small detail so weuse 
            substring() which starts from 0 letter maximun of only a 100 letters, this is good to se in long desc. */}
            <p>{item.desc?.substring(0, 50)}</p>
            <div className="price">
              {item.quantity} x ${item.price}
            </div>
          </div>
          <DeleteOutlinedIcon 
            className="delete"
            // we use dispatch to use our removeItem action from cartReducer
            onClick={() => dispatch(removeItem(item.id))}/>
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset"
      // our reset dispatch 
       onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
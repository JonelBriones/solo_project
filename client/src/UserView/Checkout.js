import React, { useContext, useState, useEffect } from "react";
import CartContext from "../CartContext";
import GymNavbar from "./GymNavbar";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const Checkout = (props) => {
  const navigate = useNavigate();
  const { cart, taxPriceParsed, shippingPrice, totalPrice, itemsPrice } =
    useContext(CartContext);
  const [orderSummary, setOrderSummary] = useState(false);
  const redirect = (page, reload) => {
    navigate(page);
    return reload ? window.location.reload() : null;
  };
  const [loggedUser, setLoggedUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/user", { withCredentials: true })
      .then((res) => {
        console.log(`Logged in as ${res.data.firstName} ${res.data.lastName}`);
        setLoggedUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <GymNavbar />
      <div className="container">
        <h1>Checkout (total:${totalPrice})</h1>
        <hr />
        <button
          className="btn-no-item"
          onClick={() => setOrderSummary(!orderSummary)}>
          {orderSummary ? "Hide" : "Show"} Order Summary
        </button>
        {orderSummary ? (
          <>
            <div>
              <p>Subtotal: ${itemsPrice}</p>
              <p>Shipping: ${shippingPrice}</p>
              <p>Taxes (estimated): ${taxPriceParsed}</p>
            </div>
            <div className="product-flex-container">
              {cart.map((oneProduct) => (
                <div key={oneProduct._id}>
                  <div className="product-view">
                    <div
                      className="product-image"
                      style={{ backgroundImage: `url(${oneProduct.image})` }}>
                      <div
                        className="product"
                        onClick={() => redirect(`/store/${oneProduct._id}`)}>
                        <div className="product-content-checkout">
                          <div>{oneProduct.name}</div>
                          <div>${oneProduct.price}.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-no-item" onClick={() => redirect(`/store`)}>
              Continue Shopping
            </button>
            <hr />
          </>
        ) : (
          <button className="btn-no-item" onClick={() => redirect(`/store`)}>
            Continue Shopping
          </button>
        )}
        <div className="checkout-form">
          <form>
            <div>
              <label>Contact Information</label>
              {!loggedUser.email ? (
                <label>
                  Already have an account?<Link to={"/users"}>Log In</Link>
                </label>
              ) : null}
              {/* <input
                type="text"
                placeholder={loggedUser.email ? loggedUser.email : "Email"}
                value={loggedUser.email}
                required></input> */}
            </div>
            {/* <div>
                            <label>Shipping Address</label>
                            <input type="text" placeholder="First Name" required></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Last Name" required></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Address" required></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Apartement (optional)"></input>
                        </div>
                        <div>
                            <input type="text" placeholder="City" required></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Country/Region" required></input>
                        </div>
                        <div>
                            <input type="text" placeholder="State" required></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Zipcode"required></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Phone Number"required></input>
                        </div>
                        */}
            {loggedUser.email ? (
              <div className="checkout-btn">
                <button
                  type="submit"
                  onClick={() => (
                    alert("Thank you for your purchase!"), redirect("/", true)
                  )}>
                  Purchase
                </button>
              </div>
            ) : (
              <div className="checkout-btn-disabled">
                <button
                  type="submit"
                  onMouseOver={() => alert("Please Log In!")}
                  disabled>
                  Purchase
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
export default Checkout;

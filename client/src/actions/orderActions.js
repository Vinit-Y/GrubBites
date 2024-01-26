// This is a JavaScript file that defines four action creators related to orders
// These action creators are written using Redux-thunk middleware that allows asynchronous actions in Redux


import axios from "axios";

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });
  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;

  try {
    // Send a post request to the server to place the order, passing along necessary details like the user, token, subtotal, and cart items
    const response = await axios.post(
      "http://localhost:8000/api/orders/placeorder",
      {
        token,
        subtotal,
        currentUser,
        cartItems,
      }
    );
    dispatch({ type: "PLACE_ORDER_SUCCESS" });

    // Return a resolved promise to chain with the emptyCart action
    return Promise.resolve();
  } catch (error) {

    // Dispatch an action to indicate that the order was placed successfully
    dispatch({ type: "PLACE_ORDER_FAILED" });

    // Return a rejected promise to handle errors
    return Promise.reject(error);
  }
};

// The second action creator 'getUserOrders' takes no parameters and returns an async 

export const getUserOrders = () => async (dispatch, getState) => {

  // Retrieve the current user from the store
  const currentUser = getState().loginUserReducer.currentUser;
  // Dispatch an action to indicate that the request for user orders is being made
  dispatch({ type: "GET_USER_ORDERS_REQUEST" });

  try {
    // Send a post request to the server to get the user's orders, passing along the user ID
    const response = await axios.post(
      "http://localhost:8000/api/orders/getuserorders",
      {
        userid: currentUser._id,
      }
    );

    console.log(response);
     // Dispatch an action to indicate that the user orders were retrieved successfully, passing along the response data
    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {

    // Dispatch an action to indicate that getting the user orders failed, passing along the error
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error });
  }
};
// The third action creator 'getAllOrders' takes no parameters and returns an async function that takes two parameters (dispatch, getState)
export const getAllOrders = () => async (dispatch, getState) => {

  // Retrieve the current user from the store
  const currentUser = getState().loginUserReducer.currentUser;
  // Dispatch an action to indicate that the request for all orders is being made
  dispatch({ type: "GET_ALLORDERS_REQUEST" });

  try {
    // Send a get request to the server to get all orders
    const response = await axios.get(
      "http://localhost:8000/api/orders/getallorders"
    );

    console.log(response);
   // Dispatch an action to indicate that all orders were retrieved successfully, passing along the response data
    dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    // Dispatch an action to indicate that getting all orders failed, passing along the error
    dispatch({ type: "GET_ALLORDERS_FAILED", payload: error });
  }
};

export const deliverOrder = (orderid) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/orders/deliverorder",
      { orderid }
    );
    console.log(response);
    alert("Order Delivered");
    const orders = await axios.get(
      "http://localhost:8000/api/orders/getallorders"
    );
    dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: orders.data });
  } catch (error) {
    console.log(error);
  }
};

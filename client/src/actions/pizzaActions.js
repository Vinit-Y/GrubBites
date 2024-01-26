// This is a JavaScript file that defines six action creators related to pizza management
// These action creators are written using Redux-thunk middleware that allows asynchronous actions in Redux

import axios from "axios";

// The first action creator 'getAllPizzas' takes no parameters and returns an async function that takes one parameter (dispatch)
export const getAllPizzas = () => async (dispatch) => {
  // Dispatch an action to indicate that the request for all pizzas is being made
  dispatch({ type: "GET_PIZZAS_REQUEST" });

  try {
    // Send a get request to the server to get all pizzas
    const response = await axios.get(
      "http://localhost:8000/api/pizzas/getallpizzas"
    );
    console.log(response);
    // Dispatch an action to indicate that all pizzas were retrieved successfully, passing along the response data
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
  } catch (error) {
    // Dispatch an action to indicate that getting all pizzas failed, passing along the error
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};
// The second action creator 'getPizzaById' takes in one parameter (pizzaid) and returns an async function that takes one parameter (dispatch)

export const getPizzaById = (pizzaid) => async (dispatch) => {
  // Dispatch an action to indicate that the request for a pizza by ID is being made
  dispatch({ type: "GET_PIZZABYID_REQUEST" });

  try {
    // Send a post request to the server to get a pizza by ID, passing along the pizza ID
    const response = await axios.post(
      "http://localhost:8000/api/pizzas/getpizzabyid",
      { pizzaid }
    );
    // Dispatch an action to indicate that the pizza was retrieved successfully, passing along the response data
    console.log(response);
    // Dispatch an action to indicate that getting the pizza by ID failed, passing along the error
    dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZABYID_FAILED", payload: error });
  }
};

// The third action creator 'filterPizzas' takes in two parameters (searchkey, category) and returns an async function that takes one parameter (dispatch)
export const filterPizzas = (searchkey, category) => async (dispatch) => {

  // Dispatch an action to indicate that the request for filtered pizzas is being made
  dispatch({ type: "GET_PIZZAS_REQUEST" });

  try {
    var filteredPizzas;
    const response = await axios.get(
      "http://localhost:8000/api/pizzas/getallpizzas"
    );
    filteredPizzas = response.data.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchkey)
    );

    if (category != "all") {
      filteredPizzas = response.data.filter(
        (pizza) => pizza.category.toLowerCase() == category
      );
    }
    // Dispatch an action to indicate that the filtered pizzas were retrieved successfully, passing along the filtered pizzas
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizzas });
  } catch (error) {

    // Dispatch an action to indicate that getting the filtered pizzas failed, passing along the error
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};

// The fifth action creator 'addPizza' takes in one parameter (pizza) and returns an async function that takes one parameter (dispatch)
export const addPizza = (pizza) => async (dispatch) => {

  // Dispatch an action to indicate that the request to add a pizza is being made
  dispatch({ type: "ADD_PIZZA_REQUEST" });
  try {
  // Send a post request to the server to add a pizza, passing along the pizza object
    const response = await axios.post(
      "http://localhost:8000/api/pizzas/addpizza",
      { pizza }
    );
    console.log(response);
    // Dispatch an action to indicate that the pizza was added successfully
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
  } catch (error) {
    // Dispatch an action to indicate that adding the pizza failed, passing along the error
    dispatch({ type: "ADD_PIZZA_FAILED", payload: error });
  }
};

// The sixth action creator 'editPizza' takes in one parameter (editedpizza) and returns an async function that takes one parameter (dispatch)
export const editPizza = (editedpizza) => async (dispatch) => {

  // Dispatch an action to indicate that the request to edit a pizza is being made
  dispatch({ type: "EDIT_PIZZA_REQUEST" });
  try {

    // Send a post request to the server to edit a pizza, passing along the edited pizza object
    const response = await axios.post(
      "http://localhost:8000/api/pizzas/editpizza",
      { editedpizza }
    );
    console.log(response);

    // Dispatch an action to indicate that the pizza was edited successfully
    dispatch({ type: "EDIT_PIZZA_SUCCESS" });
    // Redirect to the pizzas list page after successful edit
    window.location.href = "/admin/pizzaslist";
  } catch (error) {
    // Dispatch an action to indicate that editing the pizza failed, passing along the error
    dispatch({ type: "EDIT_PIZZA_FAILED", payload: error });
  }
};
// The seventh action creator 'deletePizza' takes in one parameter (pizzaid) and returns an async function that takes one parameter (dispatch)
export const deletePizza = (pizzaid) => async (dispatch) => {
  try {
    // Send a post request to the server to delete a pizza, passing along the pizza ID
    const response = await axios.post(
      "http://localhost:8000/api/pizzas/deletepizza",
      {
        pizzaid,
      }
    );

    // Alert the user that the pizza was deleted successfully
    alert("Dish Deleted Successfully");
    console.log(response);
    // Reload the page after successful delete
    window.location.reload();
  } catch (error) {
    // Alert the user that something went wrong
    alert("Something went wrong");
    console.log(error);
  }
};

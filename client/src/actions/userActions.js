
import axios from "axios";

// The eighth action creator 'registerUser' takes in one parameter (user) and returns an async function that takes one parameter (dispatch)
export const registerUser = (user) => async (dispatch) => {
  // Dispatch an action to indicate that the request to register a user is being made
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    // Send a post request to the server to register a user, passing along the user object
    const response = await axios.post(
      "http://localhost:8000/api/users/register",
      user
    );
    console.log(response);
    // Dispatch an action to indicate that the user was registered successfully
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    // Dispatch an action to indicate that registering the user failed, passing along the error
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
  }
};
// The ninth action creator 'loginUser' takes in one parameter (user) and returns an async 
export const loginUser = (user) => async (dispatch) => {
  // Dispatch an action to indicate that the request to log in a user is being made
  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    // Send a post request to the server to log in a user, passing along the user object
    const response = await axios.post(
      "http://localhost:8000/api/users/login",
      user
    );
    console.log(response);
    // Dispatch an action to indicate that the user was logged in successfully, passing along the user data received from the server
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    // Store the user data in the local storage
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    // Redirect the user to the menu page after successful login
    window.location.href = "/menu";
  } catch (error) {

    // Dispatch an action to indicate that logging in the user failed, passing along the error
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};

// The tenth action creator 'logoutUser' takes no parameters and returns a function that takes one parameter (dispatch)
export const logoutUser = () => (dispatch) => {
  // Remove the user data from the local storage
  localStorage.removeItem("currentUser");
  // Redirect the user to the login page after logout
  window.location.href = "/login";
};

// The eleventh action creator 'getAllUsers' takes no parameters and returns an async function that takes one parameter (dispatch)
export const getAllUsers = () => async (dispatch) => {
  // Dispatch an action to indicate that the request to get all users is being made
  dispatch({ type: "GET_USERS_REQUEST" });

  try {
    // Send a get request to the server to get all users
    const response = await axios.get(
      "http://localhost:8000/api/users/getallusers"
    );
    console.log(response);

    // Dispatch an action to indicate that all users were retrieved successfully, passing along the users data received from the server
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    // Dispatch an action to indicate that getting all users failed, passing along the error
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};

// The twelfth action creator 'deleteUser' takes in one parameter (userid) and returns an async function that takes one parameter (dispatch)
export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8000/api/users/deleteuser", { userid });
    alert("User deleted successfully");
    window.location.reload();
  } catch (error) {
    alert("Something went wrong");
    console.log(error);
  }
};

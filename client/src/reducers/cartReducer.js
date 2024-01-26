// This is the reducer function for the cart, which takes the current state and an action as arguments
export const cartReducer = (state = { cartItems: [] }, action) => {
  // The reducer uses a switch statement to handle different types of actions
  switch (action.type) {
    // If the action is ADD_TO_CART, the reducer checks if the item already exists in the cart.
    case "ADD_TO_CART":
      const alreadyExists = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      // If the item already exists, the reducer updates the quantity of that item in the cart.
      if (alreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        };
        // If the item does not exist, the reducer adds the item to the cart.
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    // If the action is EMPTY_CART, the reducer empties the cart.
    case "EMPTY_CART":
      // If the action is DELETE_FROM_CART, the reducer removes the specified item from the cart.
      return { ...state, cartItems: [] };

    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
      // If the action does not match any of the cases, the reducer returns the current state.
    default:
      return state;
  }
};

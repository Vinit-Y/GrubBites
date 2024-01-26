// This is a JavaScript file that defines three action creators for managing a shopping cart
// These action creators are written using Redux-thunk middleware that allows asynchronous actions in Redux

// The first action creator 'addToCart' takes in three parameters (pizza, quantity, varient) and returns a function that takes two parameters (dispatch, getState)
export const addToCart=(pizza , quantity , varient)=>(dispatch , getState)=>{
    // create a new object called 'cartItem' that contains all the necessary information of the pizza that is to be added to the cart
var cartItem = {
    name : pizza.name ,
    _id : pizza._id,
    image : pizza.image ,
    varient : varient ,
    quantity : Number(quantity) ,
    prices : pizza.prices , 
    price : pizza.prices[0][varient]* quantity
}

// If the quantity of the pizza to be added exceeds 10, display an alert message
if(cartItem.quantity>10)
{
    alert('You cannot add more than 10 quantities')
}
else{
    // If the quantity is less than 1, delete the pizza from the cart
    if(cartItem.quantity<1)
    {
        dispatch({type:'DELETE_FROM_CART' , payload:pizza}) 
    }
    // Otherwise, add the pizza to the cart
    else{
        dispatch({type:'ADD_TO_CART' , payload : cartItem})
    }   
}

// Retrieve the current state of the cart from the store
const cartItems = getState().cartReducer.cartItems
// Store the updated cartItems array in localStorage as a JSON string
localStorage.setItem('cartItems' , JSON.stringify(cartItems))
}

// The second action creator 'deleteFromCart' takes in one parameter (pizza) and returns a function that takes two parameters (dispatch, getState)
export const deleteFromCart=(pizza)=>(dispatch , getState)=>{
// Dispatch an action to delete the pizza from the cart
dispatch({type:'DELETE_FROM_CART' , payload:pizza})
// Retrieve the current state of the cart from the store
const cartItems = getState().cartReducer.cartItems
// Store the updated cartItems array in localStorage as a JSON string
localStorage.setItem('cartItems' , JSON.stringify(cartItems))
}

// The third action creator 'emptyCart' takes no parameters and returns a function that takes one parameter (dispatch)
export const emptyCart = () => (dispatch) => {
// Remove the 'cartItems' key from the localStorage
localStorage.removeItem("cartItems");
// Dispatch an action to empty the cart
dispatch({ type: "EMPTY_CART" });
};
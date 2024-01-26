import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
export default function Editpizza({ match }) {

  // Initialize dispatch and state variables using hooks
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  // Get pizza by ID state from Redux store
  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);

  const { pizza, error, loading } = getpizzabyidstate;

  // Edit pizza state from Redux store
  const editpizzastate = useSelector((state) => state.editPizzaReducer)
  const {editloading , editerror , editsuccess} = editpizzastate;

  // Get pizza by ID using useEffect hook
  useEffect(() => {
// If pizza is already in state and matches the ID from the URL, set state variables
    if(pizza)
    {
        if(pizza._id==match.params.pizzaid)
        {
            setname(pizza.name)
            setdescription(pizza.description)
            setcategory(pizza.category)
            setsmallprice(pizza.prices[0]['small'])
            setmediumprice(pizza.prices[0]['medium'])
            setlargeprice(pizza.prices[0]['large'])
            setimage(pizza.image)
        }
        else{
          // Otherwise, dispatch action to get pizza by ID
            dispatch(getPizzaById(match.params.pizzaid));
        }
        
    }
    else{
      // If pizza is not in state, dispatch action to get pizza by ID
        dispatch(getPizzaById(match.params.pizzaid));
    }



  }, [pizza , dispatch]);
  // Form submit handler

  function formHandler(e) {
    e.preventDefault();

    // Create edited pizza object
    const editedpizza = {
      _id : match.params.pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };
    // Dispatch action to edit pizza
    dispatch(editPizza(editedpizza))
  }

  // Render edit pizza form
  return (
    <div className="w-full max-w-xl mx-auto">
    <div className='flex items-center justify-center'>
      <h1 className='flex font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-600'>Edit Dish</h1>
    </div>
 <br></br>
    {loading && <Loading />}
    {error && <Error error="Something went wrong" />}
    {editsuccess && (<Success success='Dish details edited successfully'/>)}
    {editloading && (<Loading />)}

    <form onSubmit={formHandler} className="space-y-4">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => {
          setname(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="small varient price"
        value={smallprice}
        onChange={(e) => {
          setsmallprice(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="medium varient price"
        value={mediumprice}
        onChange={(e) => {
          setmediumprice(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="large varient price"
        value={largeprice}
        onChange={(e) => {
          setlargeprice(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="category"
        value={category}
        onChange={(e) => {
          setcategory(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => {
          setdescription(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="image url"
        value={image}
        onChange={(e) => {
          setimage(e.target.value);
        }}
      />
      <button className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700 rounded-md" type="submit">
        Edit Dish
      </button>
    </form>
  </div>
  );
}

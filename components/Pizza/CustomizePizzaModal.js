import React, { useState, useEffect, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

const options = ['none', 'small', 'regular', 'extra'];
export default function CustomizePizzaModal({ pizza, setCustomizeModal }) {
  //   handle the backdrop with useRed
  const node = useRef();
  const { register, handleSubmit, errors } = useForm();
  const { addCart } = useContext(AppContext);
  const [pizzaPrice, setPizzaPrice] = useState(pizza.price);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [pizzaQuantity, setPizzaQuantity] = useState(1);
  const [customPizza, setCustomPizza] = useState(pizza);
  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  const handleClick = (e) => {
    if (node?.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setCustomizeModal(false);
  };
  const findPrice = (state, price) => {
    if (state === 'regular') {
      return price;
    } else if (state === 'small') {
      return price * 2;
    } else if (state === 'none') {
      return price;
    } else if (state === 'extra') {
      return price * 5;
    }
  };
  const ingredientHandler = (data, e) => {
    // turn an object into an Array of Objects
    let dummyIngredients = Object.keys(data).map((key) => ({
      ingredient: key,
      state: data[key],
    }));
    console.log(dummyIngredients);
    let newPizza = { ...pizza };
    let ingredients = [...newPizza.ingredients];
    let newIngredients = ingredients.map((item) => {
      let index = dummyIngredients.findIndex(
        (ing) => ing.ingredient === item.ingredient
      );
      console.log(dummyIngredients[index].state);
      if (index > -1) {
        return {
          state: dummyIngredients[index].state,
          price: findPrice(dummyIngredients[index].state, item.price),
          ingredient: item.ingredient,
          icon: item.icon,
        };
      }
    });
    newPizza.ingredients = newIngredients;
    let changedIngs = newIngredients.filter((ing) => {
      return ing.state === 'extra';
    });
    let changedIngsPrices = changedIngs.map((ing) => {
      return ing.price;
    });
    console.log(changedIngsPrices);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPrice = changedIngsPrices.reduce(reducer);
    setPizzaPrice((pizza.price + totalPrice) * pizzaQuantity);
    newPizza.price = totalPrice;
    setCustomPizza(newPizza);
  };
  const quantityChangeHandler = (e) => {
    console.log(e.target.value);
    let newQuantity = e.target.value;
    let price = pizzaPrice / pizzaQuantity;
    setPizzaQuantity(newQuantity);
    setErrorMessage(undefined);
    let newPrice = price * newQuantity;
    console.log(newPrice);
    setPizzaPrice(newPrice);
  };
  const AddCartHandler = () => {
    addCart({
      ...customPizza,
      price: pizzaPrice,
      quantity: pizzaQuantity,
      id: uuidv4(),
      special: true,
    });
    setCustomizeModal(false);
  };
  return (
    <>
      <style jsx>
        {`
          .overlay {
            position: fixed;
            display: block;
            overflow: auto;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            cursor: pointer;
          }
          .modal {
            margin: 15% auto;
            background-color: #f4f4f4;
            border-radius: 0.25rem;
            width: 80%;
            padding: 0;
            position: relative;
            cursor: auto;
          }
          .modal-body {
            padding: 5px 10px;
          }
        `}
      </style>
      <div className="overlay">
        <div className="modal" ref={node}>
          <span
            className="text-red-800 text-lg font-bold absolute top-1 right-3 cursor-pointer"
            onClick={() => setCustomizeModal(false)}
          >
            <i className="fas fa-times"></i>
          </span>
          <div className="modal-body">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="col-span-1 md:col-span-3">
                <div>
                  <img
                    src={pizza.image}
                    className="rounded-b-none w-full mb-1 h-full"
                  />
                  <h3 className="font-black text-xl text-red-600 px-3 py-2">
                    {pizza.name}
                  </h3>
                </div>
              </div>
              <div className="col-span-1 md:col-span-6">
                <form onSubmit={handleSubmit(ingredientHandler)}>
                  <ul className="my-3">
                    {pizza.ingredients.map((ing, index) => {
                      return (
                        <li key={index}>
                          <label>
                            <img
                              src={ing.icon}
                              style={{
                                width: '50px',
                                height: '20px',
                                display: 'inline',
                              }}
                              className="px-2"
                            />
                            <span>{ing.ingredient}</span> :{' '}
                          </label>
                          <select name={ing.ingredient} ref={register}>
                            {options.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </li>
                      );
                    })}
                  </ul>
                  <input
                    type="submit"
                    value="finish Editing"
                    className="rounded-md cursor-pointer w-full mx-auto my-3 shadow-md bg-red-600 text-white font-bold px-5 py-3 text-lg  outline-none focus:outline-none"
                  />
                </form>
              </div>
              <div className="col-span-1 md:col-span-3">
                <div className="form-group">
                  <label className="block mb-1 mt-3" htmlFor="phone">
                    Quantity
                  </label>
                  <select
                    onChange={quantityChangeHandler}
                    className="w-full border rounded-md border-gray-500 px-3 py-2 mx-auto block outline-none focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => {
                      return <option key={i}>{num}</option>;
                    })}
                  </select>
                  {/* <input
                    type="text"
                    name="quantity"
                    placeholder="1"
                    value={pizzaQuantity}
                    onChange={quantityChangeHandler}
                    className="w-full border rounded-md border-gray-500 px-3 py-2 mx-auto block outline-none focus:outline-none"
                  /> */}
                  {errorMessage && (
                    <p className="text-sm text-bold text-red-600 px-1 py-2">
                      {errorMessage}
                    </p>
                  )}
                </div>
                <h3 className="pt-5 pb-2 text-center text-3xl text-indigo-700 font-bold">
                  {pizzaPrice}
                </h3>
                <button
                  className="px-3 py-2 text-center text-base bg-indigo-700 text-white font-bold w-full mx-auto "
                  onClick={AddCartHandler}
                >
                  <i className="fas fa-cart-plus"></i> Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

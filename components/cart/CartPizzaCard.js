import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function CartPizzaCard({ pizza }) {
  const { removePizza, morePizza, lessPizza } = useContext(AppContext);

  const morePizzaHandler = (pizza) => {
    morePizza(pizza);
  };
  const lessPizzaHandler = (pizza) => {
    lessPizza(pizza);
  };
  const removeCartHandler = (pizza) => {
    removePizza(pizza);
  };
  return (
    <>
      <style jsx>
        {`
          .special {
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 60px;
            border-bottom: solid 50px transparent;
            border-right: solid 50px transparent;
            border-left: solid 50px rgba(67, 56, 202, 0.7);
            border-top: solid 50px rgba(67, 56, 202, 0.7);
          }

          .special h3 {
            transform: rotate(-45deg);
            width: 40px !important;
            height: 40px !important;
            margin: 0;
            padding: 0;
            position: absolute;
            top: -32px;
            left: -43px;
            color: white;
          }
          .direction {
            direction: ltr;
          }
          @media screen and (max-width: 600px) {
            .direction {
              direction: rtl;
            }
          }
        `}
      </style>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 rounded-sm shadow-md bg-white my-3 relative">
        {pizza.special && (
          <div className="special">
            <h3>Special</h3>
          </div>
        )}
        <div className="col-span-1 md:col-span-4">
          <img
            src={pizza.image}
            className="rounded-b-none w-full mb-3 h-full"
          />
        </div>
        <div className="col-span-1 md:col-span-7">
          <h3 className="font-black text-xl text-red-600 px-3">{pizza.name}</h3>
          <ul className="my-3">
            {pizza.ingredients.map((ing, index) => {
              return (
                <li key={index}>
                  <img
                    src={ing.icon}
                    style={{ width: '50px', height: '20px', display: 'inline' }}
                    className="px-2"
                  />
                  <span>{ing.ingredient}</span> :{' '}
                  <span className="text-red-600">{ing.state}</span>
                </li>
              );
            })}
          </ul>
          <div className="grid grid-cols-2 gap-4 my-3">
            <div className="font-normal text-lg text-indigo-600 px-3">
              {pizza.price * pizza.quantity} Egp
            </div>
            <i>
              <button
                onClick={() => removeCartHandler(pizza)}
                className="outline-none text-lg bg-indigo-700 text-white w-full py-2 px-3 focus:outline-none  hover:bg-transparent  hover:text-indigo-700"
              >
                <i className="fas fa-trash"></i> Remove
              </button>
            </i>
          </div>
        </div>
        <div className="col-span-1 md:col-span-1">
          <div className="direction h-full grid grid-cols-4 md:grid-cols-none w-full md:grid-rows-4">
            <div>
              <button
                onClick={() => morePizzaHandler(pizza)}
                className="outline-none text-lg bg-indigo-700 text-white w-full py-2 px-3 focus:outline-none h-full disabled:opacity-50  disabled:bg-gray-700"
                disabled={pizza.quantity >= 10}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="col-span-2 row-span-2 border text-lg font-medium text-center justify-items-center items-center grid">
              {pizza.quantity}
            </div>
            <div>
              <button
                onClick={() => lessPizzaHandler(pizza)}
                className="outline-none text-lg bg-indigo-700 text-white w-full py-2 px-3 focus:outline-none h-full disabled:opacity-50  disabled:bg-gray-700"
                disabled={pizza.quantity === 1}
              >
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function PizzaCard({ pizza, customizePizzaHandler }) {
  const { addCart } = useContext(AppContext);
  const addToCartHandler = (pizza) => {
    addCart({ ...pizza, quantity: 1 });
  };
  return (
    <>
      <style jsx>
        {`
          .truncate-overflow {
            --lh: 1.2rem;
            line-height: var(--lh);
            --max-lines: 2;
            position: relative;
            max-height: calc(var(--lh) * var(--max-lines));
            overflow: hidden;
            padding-right: 5px; /* space for ellipsis */
          }
          .truncate-overflow:after{
            content: '...',
            position: 'absolute',
            
          }
        `}
      </style>
      <div className="rounded-sm shadow-md bg-white my-3 pb-12 relative">
        <img src={pizza.image} className="rounded-b-none w-full mb-3" />
        <h3 className="font-black text-xl text-red-600 px-3">{pizza.name}</h3>
        <p className="text-sm text-blue-400 px-3 pb-3  overflow-ellipsis overflow-hidden">
          {pizza.ingDescription}
        </p>
        <div className="grid grid-cols-4 text-center my-3 absolute w-full -bottom-3">
          <div>
            <button
              onClick={() => addToCartHandler(pizza)}
              className="outline-none text-lg bg-indigo-700 text-white w-full py-2 text-center focus:outline-none "
            >
              <i className="fas fa-cart-plus"></i>
            </button>
          </div>
          <div className="col-span-2 border text-lg font-medium py-2">
            {pizza.price} Egp
          </div>
          <div>
            <button
              onClick={() => customizePizzaHandler(pizza)}
              className="outline-none text-lg border border-indigo-700 focus:outline-none text-center  text-indigo-700 w-full py-2 px-2"
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

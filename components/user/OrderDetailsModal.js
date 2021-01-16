import React, { useState, useEffect, useRef } from 'react';

export default function OrderDetailsModal({ order, setOrderDetailsModal }) {
  const node = useRef();
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
    setOrderDetailsModal(false);
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
          .log-btn {
            background-color: #fff;
            border: 1px solid #eee;
            box-shadow: 0px 2px 2px #ccc;
            color: #ccc;
            width: 100%;
            padding: 5px;
            margin: 0;
          }
          .log-btn:active,
          .log-btn.active {
            background-color: #192a56;
            color: #fff;
          }
        `}
      </style>
      <div className="overlay">
        <div className="modal" ref={node}>
          <span
            className="text-red-800 text-lg font-bold absolute top-1 right-3 cursor-pointer"
            onClick={() => setOrderDetailsModal(false)}
          >
            <i className="fas fa-times"></i>
          </span>
          <div className="modal-body">
            <h3 className="text-indigo-600 text-lg font-medium py-3 pl-3">
              Order Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 px-2">
              <div className="col-span-1 md:col-span-8">
                {order.orders.map((pizza) => {
                  return (
                    <div
                      key={pizza.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-5"
                    >
                      <div className="col-span-1 md:col-span-4 my-2">
                        <img
                          src={pizza.image}
                          className="rounded-b-none w-full mb-3 h-full"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-6 mt-3">
                        <h3 className="font-black text-xl text-red-600 px-3 pt-5 pb-2">
                          {pizza.name}
                        </h3>
                        <p className="font-normal text-base text-indigo-700 px-3 pt-1 pb-5">
                          {pizza.ingDescription}
                        </p>
                      </div>
                      <div className="col-span-1 md:col-span-2 mt-3">
                        <h3 className="px-2 py-2 mt-5 mb-2 text-center rounded-xl bg-indigo-700 text-sm font-medium text-white">
                          {pizza.price} Egp
                        </h3>
                        <h3 className="px-2 py-2 mt-5 mb-2 text-center rounded-xl bg-red-700 text-sm font-medium text-white">
                          {pizza.quantity}{' '}
                          <i className="fas fa-pizza-slice"></i>{' '}
                          {/* change the word pizzas to the slices logo */}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-span-1 md:col-span-4">
                <div className="rounded-md shadow-md border-2 mb-4">
                  <h3 className="text-gray-800 text-lg font-medium py-3 pl-3">
                    Order Summary
                  </h3>
                  <div className="flex justify-between px-3 my-2">
                    <div className="font-semibold text-lg text-indigo-700">
                      Order Number
                    </div>
                    <div className="font-bold text-xs"># {order.id}</div>
                  </div>
                  <div className="flex justify-between px-3 my-2">
                    <div className="font-semibold text-lg text-indigo-700">
                      Total Price
                    </div>
                    <div className="font-bold text-xs">
                      {order.totalPrice} Egp
                    </div>
                  </div>
                  <div className="flex justify-between px-3 my-2">
                    <div className="font-semibold text-lg text-indigo-700">
                      Coupon Discount
                      {order.coupon.coupon && (
                        <p className="text-red-500 text-sm font-medium pb-3 pt-1">
                          {order.coupon.coupon}
                        </p>
                      )}
                    </div>
                    <div className="font-bold text-xs">
                      {order.coupon.value
                        ? (order.totalPrice * order.coupon.value) / 100
                        : 0}{' '}
                      Egp
                    </div>
                  </div>
                  <div className="flex justify-between px-3 my-2">
                    <div className="font-semibold text-lg text-indigo-700">
                      Paid Price
                    </div>
                    <div className="font-bold text-xs">
                      {order.finalPrice} Egp
                    </div>
                  </div>
                </div>
                <div className="rounded-md shadow-md border-2 mt-4 mb-2">
                  <h3 className="text-red-700 text-lg font-medium py-3 pl-3">
                    User Details
                  </h3>
                  <div className="flex justify-between px-3 my-2">
                    <div className="font-semibold text-lg text-indigo-700">
                      User Name
                    </div>
                    <div className="font-bold text-xs">
                      {order.user.firstName + '' + order.user.lastName}
                    </div>
                  </div>
                  <div className="flex justify-between px-3 my-2">
                    <div className="font-semibold text-lg text-indigo-700">
                      Phone Number
                    </div>
                    <div className="font-bold text-xs">{order.user.phone}</div>
                  </div>
                  <div className="flex justify-between px-3 my-2">
                    <div className="font-semibold text-lg text-indigo-700">
                      Delivery Address
                    </div>
                    <div className="font-bold text-xs">
                      {order.user.city + '-' + order.user.street + 'St.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

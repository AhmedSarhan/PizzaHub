import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import OrderDetailsModal from './OrderDetailsModal';

export default function PreviousOrders() {
  const { confirmedOrders } = useContext(AppContext);
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const orderDetailsHandler = (order) => {
    console.log(order);
    setSelectedOrder(order);
    setOrderDetailsModal(true);
  };
  return (
    <div className="my-3 mb-5 mx-auto">
      <h3 className="text-center text-xl py-3 text-red-700 font-bold">
        Previous Orders
      </h3>
      {confirmedOrders.length > 0 && (
        <>
          <div className="grid grid-cols-4 text-center bg-indigo-800 text-white">
            <div className="border p-3 mx-auto w-full">Order</div>
            <div className="border p-3 mx-auto w-full">Price</div>
            <div className="border p-3 mx-auto w-full">Date</div>
            <div className="border p-3 mx-auto w-full">Details</div>
          </div>
          <div className="grid  grid-cols-4 text-center text-indigo-800 bg-white">
            {confirmedOrders.map((order, index) => {
              return (
                <>
                  <div className="border p-3 mx-auto w-full">{index + 1}</div>
                  <div className="border p-3 mx-auto w-full">
                    {order.finalPrice}
                  </div>
                  <div className="border p-3 mx-auto w-full">{order.date}</div>
                  <div className="border p-3 mx-auto w-full">
                    <button
                      className="bg-red-600 text-white font-medium text-base w-4/5 my-3 mx-auto block py-2 px-3 outline-none focus:outline-none"
                      onClick={() => orderDetailsHandler(order)}
                    >
                      Order Details
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      {orderDetailsModal && (
        <OrderDetailsModal
          order={selectedOrder}
          setOrderDetailsModal={setOrderDetailsModal}
        />
      )}
    </div>
  );
}

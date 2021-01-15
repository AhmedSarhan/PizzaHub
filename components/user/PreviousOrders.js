import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function PreviousOrders() {
  const { confirmedOrders } = useContext(AppContext);
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const orderDetailsHandler = (order) => {
    console.log(order);
    setSelectedOrder(order);
  }
  return (
    <div>
      <h3>Previous Orders</h3>
      {confirmedOrders.length > 0 && (
        <>
          <div className="grid gap-2 text-center bg-indigo-800 text-white my-3">
            <div className="border p-3 mx-auto">Order</div>
            <div className="border p-3 mx-auto">Price</div>
            <div className="border p-3 mx-auto">Date</div>
            <div className="border p-3 mx-auto">Details</div>
          </div>
          <div className="grid gap-2 text-center bg-indigo-800 text-white my-3">
            {confirmedOrders.map((order, index) => {
              return (
                <>
                  <div className="border p-3 mx-auto">{index}</div>
                  <div className="border p-3 mx-auto">{order.finalPrice}</div>
                  <div className="border p-3 mx-auto">{order.date}</div>
                  <div className="border p-3 mx-auto">
                    <button className="bg-red-600 text-white font-medium text-base w-4/5 my-3 mx-auto block py-2 px-3" onClick={() => orderDetailsHandler(order)}>
                      Order Details
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

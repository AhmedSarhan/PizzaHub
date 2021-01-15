import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function cartFinances({
  cartOrders,
  couponValue,
  setValidCoupon,
  cartPage,
}) {
  const [cartTotal, setCartTotal] = useState(0);
  const [couponEntry, setCouponEntry] = useState({});
  const router = useRouter();
  const shippingFees = 30;
  useEffect(() => {
    let prices = [];
    for (let order in cartOrders) {
      prices.push(cartOrders[order].price * cartOrders[order].quantity);
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPrice = prices.reduce(reducer);
    setCartTotal(totalPrice);
  }, [cartOrders]);
  useEffect(() => {
    if (couponValue.coupon !== undefined) {
      setCouponEntry(couponValue);
    } else {
      setCouponEntry();
    }
  }, [couponValue]);
  const removeCouponHandler = () => {
    setCouponEntry({});
    setValidCoupon({});
  };
  const checkoutHandler = () => {
    router.push('/checkout');
  };
  return (
    <>
      {cartPage && (
        <button
          onClick={checkoutHandler}
          className="rounded-md text-center w-full mx-auto my-3 shadow-md bg-indigo-700 text-white font-bold px-5 py-3 text-lg  outline-none focus:outline-none"
        >
          Proceed to Checkout
        </button>
      )}
      <div className="mt-3 mb-6 pb-3 border rounded-md shadow-md w-full">
        <div className="p-3 mb-3 bg-indigo-700 text-white text-lg font-medium capitalize">
          Cart Summary
        </div>
        <div className="flex justify-between px-3 my-2">
          <div className="font-semibold text-lg text-indigo-700">Total</div>
          <div className="font-bold text-lg">{cartTotal} Egp</div>
        </div>
        <div className="flex justify-between px-3 my-2">
          <div className="font-semibold text-lg text-indigo-700">
            Shipping Fees
          </div>
          <div className="font-bold text-lg">{shippingFees} Egp</div>
        </div>
        <div className="flex justify-between px-3 my-2">
          <div className="font-semibold text-lg text-indigo-700">
            Coupon Discount
            {couponEntry && (
              <p className="text-red-500 text-sm font-medium pb-3 pt-1">
                {cartPage && (
                  <i
                    className="fas fa-times cursor-pointer"
                    onClick={removeCouponHandler}
                  ></i>
                )}{' '}
                {couponEntry.coupon}
              </p>
            )}
          </div>
          <div className="font-bold text-lg">
            {couponEntry ? (cartTotal * couponEntry.value) / 100 : 0} Egp{' '}
            {couponEntry &&
              `(
           ${couponEntry.value}%)`}
          </div>
        </div>
        <hr />
        <div className="flex justify-between px-3 my-2">
          <div className="font-semibold text-lg text-indigo-700">
            Grand Total
          </div>
          <div className="font-bold text-lg">
            {couponEntry
              ? (
                  (cartTotal * (100 - couponEntry.value)) / 100 +
                  shippingFees
                ).toFixed(2)
              : (cartTotal + shippingFees).toFixed(2)}{' '}
            Egp
          </div>
        </div>
      </div>
    </>
  );
}

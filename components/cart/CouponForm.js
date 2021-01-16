import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const validCoupons = [
  {
    coupon: 'Happy New Year',
    value: 10,
  },
  {
    coupon: "Single's Valentine",
    value: 80,
  },
  {
    coupon: 'Pizza Hub Special One',
    value: 50,
  },
  {
    coupon: 'The Goat',
    value: 90,
  },
];

export default function CouponForm({ setValidCoupon }) {
  const { register, handleSubmit, errors, reset } = useForm();
  const [nonCouponState, setNonCouponState] = useState(undefined);
  const onSubmit = (data, e) => {
    console.log(data);
    let enteredCoupon = data.coupon;
    let dummyArray = validCoupons.filter((cop) => {
      return cop.coupon === enteredCoupon;
    });
    if (dummyArray.length === 1) {
      setValidCoupon(dummyArray[0]);
      setNonCouponState('');
    } else {
      setNonCouponState(enteredCoupon + ' is not a valid Coupon');
    }
    e.target.reset();
  };

  return (
    <div className="mt-3 mb-6 pb-3 border rounded-md shadow-md w-full p-5">
      {/* <div className="p-3 mb-3 bg-red-600 text-white text-lg font-medium capitalize">
        Got A Coupon?
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="coupon"
          id="coupon"
          className=" rounded-md w-full mx-auto my-3 border text-base font-medium p-3 border-gray-400 outline-none focus:outline-none"
          ref={register({ required: 'Please Enter a Coupon First' })}
        />
        {errors.exampleRequired && (
          <p className="text-red-700 text-sm font-semibold py-1">
            {errors.required.message}
          </p>
        )}
        {nonCouponState && (
          <p className="text-red-700 text-sm font-semibold py-1">
            {nonCouponState}
          </p>
        )}
        <input
          type="submit"
          value="Enter Coupon"
          className="rounded-md whitespace-normal	 w-full mx-auto my-3 cursor-pointer shadow-md bg-indigo-700 text-white font-bold px-5 py-3 text-lg  outline-none focus:outline-none"
        />
      </form>
    </div>
  );
}

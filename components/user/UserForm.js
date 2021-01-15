import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { AppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

export default function UserForm({
  cartOrders,
  validCoupon,
  editing,
  setValidCoupon,
  setEditingUser,
}) {
  const { confirmOrder, setUser, user, clearCart } = useContext(AppContext);
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: user
      ? user
      : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          street: '',
        },
  });
  const userDataHandler = (data, e) => {
    e.target.reset();
    let order = {};
    let shippingFees = 30;
    order.orders = [...cartOrders];
    let prices = [];
    for (let order in cartOrders) {
      prices.push(cartOrders[order].price * cartOrders[order].quantity);
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPrice = prices.reduce(reducer);
    order.totalPRice = totalPrice;
    order.finalPrice = validCoupon.value
      ? (totalPrice * (100 - validCoupon.value)) / 100 + shippingFees
      : totalPrice + shippingFees;
    order.user = { ...data };
    order.id = uuidv4();
    order.date = moment(new Date()).format('dddd, MMM Do YYYY');
    console.log(order);
    confirmOrder(order);
    setUser(data);
    clearCart();
    setValidCoupon({});
  };
  const newUserHandler = (data, e) => {
    e.target.reset();
    setUser(data);
    setEditingUser(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(editing ? newUserHandler : userDataHandler)}>
        <style jsx>
          {`
            .form-group label {
              font-size: 14px;
              padding: 5px;
              padding-bottom: 1px;
            }
            .form-group input {
              border-radius: 5px;
              padding: 5px;
              width: 100%;
              border: 1px solid #ccc;
              outline: none;
            }
            .form-group input:focus {
              outline: none;
            }
          `}
        </style>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-1 mt-3" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              ref={register({
                required: 'First Name is Required',
                minLength: {
                  value: 3,
                  message: "First Name can't be shorter than 3 Characters",
                },
              })}
            />
            {errors.firstName && (
              <p className="text-sm text-bold text-red-600 px-1 py-2">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block mb-1 mt-3" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              ref={register({
                required: 'Last Name is Required',
                minLength: {
                  value: 3,
                  message: "Last Name can't be shorter than 3 Characters",
                },
              })}
            />
            {errors.lastName && (
              <p className="text-sm text-bold text-red-600 px-1 py-2">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-1 mt-3" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              ref={register({
                required: 'Email is Required',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Please Enter A valid Email Address',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-bold text-red-600 px-1 py-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block mb-1 mt-3" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              ref={register({
                required: 'Phone Number is Required',
                minLength: {
                  value: 11,
                  message: "Phone Number can't be less than 11 Characters",
                },
                pattern: {
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im,
                  message: 'Please Enter A valid Phone Number',
                },
              })}
            />
            {errors.phone && (
              <p className="text-sm text-bold text-red-600 px-1 py-2">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block mb-1 mt-3" htmlFor="city">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter your City"
              ref={register({
                required: 'City is Required',
              })}
            />
            {errors.city && (
              <p className="text-sm text-bold text-red-600 px-1 py-2">
                {errors.city.message}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="block mb-1 mt-3" htmlFor="street">
              Street
            </label>
            <input
              type="text"
              name="street"
              placeholder="Street"
              ref={register({
                required: 'Street is Required',
              })}
            />
            {errors.street && (
              <p className="text-sm text-bold text-red-600 px-1 py-2">
                {errors.street.message}
              </p>
            )}
          </div>
        </div>
        {!editing && (
          <input
            type="submit"
            value="Confirm Order"
            className="rounded-md cursor-pointer text-center w-full mx-auto  my-10 shadow-md bg-red-600 text-white font-bold px-5 py-3 text-lg  outline-none focus:outline-none"
          />
        )}
        {editing && (
          <input
            type="submit"
            value="Save"
            className="rounded-md cursor-pointer text-center w-full mx-auto  my-10 shadow-md bg-indigo-600 text-white font-bold px-5 py-3 text-lg  outline-none focus:outline-none"
          />
        )}
      </form>
    </div>
  );
}

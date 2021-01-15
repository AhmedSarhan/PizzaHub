import React, { useEffect, useContext, useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import { AppContext } from '../../context/AppContext';
import CartFinances from '../../components/cart/CartFinances';
import UserForm from '../../components/user/userForm';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function CheckoutPage() {
  const { cartOrders } = useContext(AppContext);
  const [validCoupon, setValidCoupon] = useState({});
  useEffect(() => {
    if (process.browser) {
      let localData = localStorage.getItem('validCoupon');
      let savedCoupon = localData ? JSON.parse(localData) : {};
      setValidCoupon(savedCoupon);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('validCoupon', JSON.stringify(validCoupon));
  }, [validCoupon]);
  const router = useRouter();
  return (
    <Layout>
      <div className="container px-3 my-3 mx-auto">
        {cartOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <UserForm
                cartOrders={cartOrders}
                validCoupon={validCoupon}
                setValidCoupon={setValidCoupon}
              />
            </div>
            <div>
              <CartFinances
                cartOrders={cartOrders}
                couponValue={validCoupon}
                setValidCoupon={setValidCoupon}
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-lg text-indigo-700 font-bold py-8 pb-20 text-center ">
              You Haven't Ordered any Thing yet, Check Our{' '}
              <span
                className="cursor-pointer underline pb-1 text-red-700 "
                onClick={() => {
                  router.push('/menu');
                }}
              >
                Menu
              </span>{' '}
              First
            </h1>
          </>
        )}
      </div>
    </Layout>
  );
}
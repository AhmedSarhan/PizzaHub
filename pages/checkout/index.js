import React, { useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layouts/Layout';
import { AppContext } from '../../context/AppContext';
import CartFinances from '../../components/cart/CartFinances';
import UserForm from '../../components/user/UserForm';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import OrderConfirmationModal from '../../components/user/OrderConfirmationModal';

export default function CheckoutPage() {
  const { cartOrders } = useContext(AppContext);
  const [validCoupon, setValidCoupon] = useState({});
  const [confirmationModal, setConfirmationModal] = useState(false);
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
      <Head>
        <title>CheckOut Page</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Pizza Hub home Page" key="title" />
        <meta
          name="description"
          content="Pizza Restaurant for families that provides great pizzas and appetizers "
        />
      </Head>
      <div className="container px-3 my-3 mx-auto">
        {cartOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1 row-start-2 md:row-start-1 md:col-span-2">
              <UserForm
                cartOrders={cartOrders}
                validCoupon={validCoupon}
                setValidCoupon={setValidCoupon}
                setConfirmationModal={setConfirmationModal}
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
      {confirmationModal && (
        <OrderConfirmationModal setConfirmationModal={setConfirmationModal} />
      )}
    </Layout>
  );
}

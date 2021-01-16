import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import PreviousOrders from '../../components/user/PreviousOrders';
import UserData from '../../components/user/UserData';
import UserForm from '../../components/user/userForm';
import { AppContext } from '../../context/AppContext';

export default function ProfilePage() {
  const { user } = useContext(AppContext);
  const [showUser, setShowUser] = useState(true);
  const [editUser, setEditingUser] = useState(true);
  useEffect(() => {
    if (user) {
      setEditingUser(false);
    }
  }, []);
  return (
    <Layout>
      <div className="container px-3 mx-auto grid grid-cols-1 md:grid-cols-3  gap-10 my-10">
        <div className="col-span-2 row-start-2 md:row-start-1 my-4">
          {showUser ? (
            <>
              {editUser ? (
                <UserForm
                  cartOrders={[]}
                  validCoupon={[]}
                  editing
                  setValidCoupon={null}
                  setEditingUser={setEditingUser}
                />
              ) : (
                <>
                  <UserData />
                  <button
                    onClick={() => setEditingUser(true)}
                    className="bg-indigo-700 text-white font-medium text-center cursor-pointer py-2 px-3 rounded-md shadow-md text-lg block mx-auto w-4/5 my-7 "
                  >
                    Edit User
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <PreviousOrders />
            </>
          )}
        </div>
        <div className="col-span-1 items-center flex">
          <ul className="py-3 text-center rounded-md shadow-md w-full mx-auto block">
            <li
              className={
                'w-full ' +
                (showUser
                  ? 'bg-indigo-700 text-white '
                  : 'bg-white text-indigo-700') +
                'text-lg font-medium block cursor-pointer'
              }
              onClick={() => setShowUser(!showUser)}
            >
              User Info
            </li>
            <li
              className={
                'w-full ' +
                (!showUser
                  ? 'bg-indigo-700 text-white '
                  : 'bg-white text-indigo-700') +
                'text-lg font-medium block cursor-pointer'
              }
              onClick={() => setShowUser(!showUser)}
            >
              Previous Orders
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

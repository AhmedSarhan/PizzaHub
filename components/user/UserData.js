import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function UserData() {
  const { user } = useContext(AppContext);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between my-3">
          <div className="text-indigo-700 font-medium text-sm md:text-lg px-3 py-1">
            User Name:
          </div>
          <div className="bg-indigo-300 font-medium text-sm md:text-lg px-3 py-1">{`${user.firstName} ${user.lastName}`}</div>
        </div>
        <div className="flex justify-between my-3">
          <div className="text-indigo-700 font-medium text-sm md:text-lg px-3 py-1">
            Phone Number
          </div>
          <div className="bg-indigo-300 font-medium text-sm md:text-lg px-3 py-1">
            {user.phone}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between my-3">
          <div className="text-indigo-700 font-medium text-sm md:text-lg px-3 py-1">
            Email:
          </div>
          <div className="bg-indigo-300 font-medium text-sm md:text-lg px-3 py-1">
            {user.email}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between my-3">
          <div className="text-indigo-700 font-medium text-sm md:text-lg px-3 py-1">
            Address:
          </div>
          <div className="bg-indigo-300 font-medium text-sm md:text-lg px-3 py-1">{`${user.city}  - ${user.street} st.`}</div>
        </div>
      </div>
    </div>
  );
}

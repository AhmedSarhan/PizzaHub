import React, { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import { NavLinks } from '../nav/NavLinks';
// import { AppContext } from './../../Context/AppContextProvider';
function Header() {
  // const [loginModal, setLoginModal] = useState(false);

  return (
    <>
      <header className="relative my-3 border-t-0 border-b-2 border-l-0 border-r-0 border-solid border-gray-400 shadow p-2 pb-4">
        <div style={{ bottom: '0', width: '100%' }}>
          <nav className="container mx-auto px-4 flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
            <Link href="/">
              <h3
                className="text-bold text-2xl text-indigo-800"
                style={{ cursor: 'pointer' }}
              >
                Pizza Hub
              </h3>
            </Link>
            <div className="pt-2">
              <NavLinks />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
export default Header;

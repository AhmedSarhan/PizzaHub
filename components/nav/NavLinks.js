import React, { useContext } from 'react';
import ActiveLink from '../ActiveLink';
import { AppContext } from '../../context/AppContext';

export const NavLinks = (props) => {
  const { cartOrders } = useContext(AppContext);

  return (
    <>
      <style jsx>{`
        .nav-link {
          text-decoration: none;
          font-size: 18px;
          padding-bottom: 5px;
          font-weight: 500;
        }
        .active {
          border-bottom: 3px solid #3c40c6;
          color: #3c40c6;
        }
        .nav-link:hover,
        .nav-link:active {
          border-bottom: 3px solid #3c40c6;
          color: #3c40c6;
        }
      `}</style>
      <ActiveLink activeClassName="active" href={`/`}>
        <a className="nav-link mx-2">Home</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href={`/about`}>
        <a className="nav-link mx-2">About</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href={`/menu`}>
        <a className="nav-link mx-2">Menu</a>
      </ActiveLink>
      <ActiveLink activeClassName="active" href={`/cart`}>
        <a className="nav-link mx-2 relative">
          Cart
          {cartOrders.length > 0 && (
            <span
              className="text-sm text-white font-medium rounded-full absolute -top-0 right-0 bg-indigo-700"
              style={{
                borderRadius: '50%',
                padding: '2px 5px',
                top: '-10px',
                right: '-15px',
              }}
            >
              {cartOrders.length}
            </span>
          )}
        </a>
      </ActiveLink>
    </>
  );
};

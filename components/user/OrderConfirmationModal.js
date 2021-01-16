import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function OrderConfirmationModal({ setConfirmationModal }) {
  const router = useRouter();

  return (
    <>
      <style jsx>
        {`
          .overlay {
            position: fixed;
            display: block;
            overflow: auto;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            cursor: pointer;
          }

          .modal {
            margin: 15% auto;
            background-color: #f4f4f4;
            border-radius: 0.25rem;
            width: 80%;
            padding: 0;
            position: relative;
            cursor: auto;
          }
          .modal-body {
            padding: 5px 10px;
          }
          .log-btn {
            background-color: #fff;
            border: 1px solid #eee;
            box-shadow: 0px 2px 2px #ccc;
            color: #ccc;
            width: 100%;
            padding: 5px;
            margin: 0;
          }
          .log-btn:active,
          .log-btn.active {
            background-color: #192a56;
            color: #fff;
          }
        `}
      </style>
      <div className="overlay">
        <div className="modal">
          <div className="modal-body text-center">
            <div className="text-center pt-4 font-medium text-2xl text-red-700">
              <i className="fas fa-pizza-slice"></i>
            </div>
            <h3 className="text-indigo-600 text-lg font-medium py-3 pl-3">
              You Order Have Been Confirmed you Can follow up on it at your{' '}
              <a
                onClick={() => {
                  setConfirmationModal(false);
                  router.push('/profile');
                }}
                className="cursor-pointer font-semibold underline pb-1 text-red-700 "
              >
                Profile Page
              </a>{' '}
              or Go Back to The{' '}
              <a
                onClick={() => {
                  setConfirmationModal(false);
                  router.push('/menu');
                }}
                className="cursor-pointer font-semibold underline pb-1 text-red-700 "
              >
                Menu Page
              </a>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

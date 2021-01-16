import React from 'react';

export default function Loading() {
  return (
    <>
      <style jsx>
        {`
          .loader {
            font-size: 25px;
            margin: 50px auto;
            text-indent: -9999em;
            width: 11em;
            height: 11em;
            border-radius: 50%;
            background: #6126cf;
            background: -moz-linear-gradient(
              left,
              #6126cf 10%,
              rgba(97, 38, 207, 0) 42%
            );
            background: -webkit-linear-gradient(
              left,
              #6126cf 10%,
              rgba(97, 38, 207, 0) 42%
            );
            background: -o-linear-gradient(
              left,
              #6126cf 10%,
              rgba(97, 38, 207, 0) 42%
            );
            background: -ms-linear-gradient(
              left,
              #6126cf 10%,
              rgba(97, 38, 207, 0) 42%
            );
            background: linear-gradient(
              to right,
              #6126cf 10%,
              rgba(97, 38, 207, 0) 42%
            );
            position: relative;
            -webkit-animation: load3 1.4s infinite linear;
            animation: load3 1.4s infinite linear;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
          }
          .loader:before {
            width: 50%;
            height: 50%;
            background: #6126cf;
            border-radius: 100% 0 0 0;
            position: absolute;
            top: 0;
            left: 0;
            content: '';
          }
          .loader:after {
            background: #eef1f1;
            width: 75%;
            height: 75%;
            border-radius: 50%;
            content: '';
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          }
          @-webkit-keyframes load3 {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
          @keyframes load3 {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="loader">Loading...</div>
    </>
  );
}

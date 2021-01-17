import React from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, title = 'This is the default title' }) => {
  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Potta+One&display=swap');
        .main-app {
          font-family: 'Noto Sans SC', sans-serif !important;
        }
      `}</style>
      <div className="main-app">
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;

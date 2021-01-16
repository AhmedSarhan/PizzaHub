import React, { useEffect, useContext, useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import CustomizePizzaModal from '../../components/Pizza/CustomizePizzaModal';
import PizzaCategories from '../../components/Pizza/PizzaCategories';
import PizzaCard from '../../components/Pizza/PizzaCard';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Loading';
import Head from 'next/head';
export default function MenuPage() {
  const { menuState } = useContext(AppContext);
  const [customizeModal, setCustomizeModal] = useState(false);
  const [customizedPizza, setCustomizedPizza] = useState({});
  const [filterCategory, setFilterCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const customizePizzaHandler = (pizza) => {
    setCustomizedPizza({ ...pizza });
    setCustomizeModal(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <Layout>
      <Head>
        <title>Pizza Hub Menu</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Pizza Hub home Page" key="title" />
        <meta
          name="description"
          content="Pizza Restaurant for families that provides great pizzas and appetizers "
        />
      </Head>
      <div className="container px-3 my-3 mx-auto">
        <>
          {!loading ? (
            <>
              <PizzaCategories setFilterCategory={setFilterCategory} />
              <h1 className="text-lg text-red-600 font-bold py-3">
                We have {menuState.length}{' '}
                {filterCategory.name === 'all' ? '' : filterCategory.name}{' '}
                pizzas
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {menuState.map((pizza) => {
                  return (
                    <PizzaCard
                      key={pizza.id}
                      pizza={pizza}
                      customizePizzaHandler={customizePizzaHandler}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-lg text-red-600 font-bold py-3">
                We have {menuState.length}{' '}
                {filterCategory.name === 'all' ? '' : filterCategory.name}{' '}
                pizzas
              </h1>
              <Loading />
            </>
          )}
        </>
      </div>
      {customizeModal && (
        <CustomizePizzaModal
          pizza={customizedPizza}
          setCustomizeModal={setCustomizeModal}
        />
      )}
    </Layout>
  );
}

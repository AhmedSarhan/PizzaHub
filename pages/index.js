import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layouts/Layout';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <style jsx>{``}</style>
      <Layout>
        <Head>
          <title>Pizza Hub</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="title" content="Pizza Hub home Page" key="title" />
          <meta
            name="description"
            content="Pizza Restaurant for families that provides great pizzas and appetizers "
          />
        </Head>
        <section className="top-section w-full flex flex-col items-center justify-center">
          <h1 className="block text-center text-white text-3xl md:text-5xl font-bold pt-10 pb-1">
            Welcome to PizzaHub
          </h1>
          <h3 className="block text-center text-red-700 text-xl md:text-3xl font-semibold pt-1 pb-5">
            Authenticate Italian Pizzas
          </h3>
        </section>
        <div className="container mx-auto px-4">
          <section className="py-3 mt-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center my-3">
              <i className="fas fa-pizza-slice  text-red-700 text-lg"></i>
              <h3 className="text-3xl font-bold py-2">Welcome to Pizza Hub</h3>
              <h5 className="text-2xl font-medium text-red-700 py-2">
                Family Cafe & Pizzeria
              </h5>
              <p className="text-lg font-medium text-indigo-700 py-2">
                Our chefs are working 24/7 and are ready to accept visitors and
                at any time of the day and night
              </p>
              <p className="text-lg font-medium text-black py-2">
                We would like to take this opportunity to welcome you at our
                Pizza House. We are offering a warm, friendly atmosphere to
                share a meal with family and friends at any time of the day or
                evening.
              </p>
              <button
                onClick={() => {
                  router.push('/menu');
                }}
                className="my-3 outline-none focus:outline-none rounded-2xl border border-transparent py-3 px-5 bg-red-700 text-white shadow-md hover:bg-white hover:text-red-700 hover:border-red-700"
              >
                Visit Menu
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5 my-3 items-center">
              <div>
                <img
                  src="https://i.imgur.com/be9GQbo.png"
                  className="w-full "
                />
              </div>
              <div>
                <img
                  src="https://i.imgur.com/GX7Vmfq.png"
                  className="w-full "
                />
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

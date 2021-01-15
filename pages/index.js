import Head from 'next/head';
import Layout from '../components/Layouts/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Pizza Hub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Layout>
  );
}

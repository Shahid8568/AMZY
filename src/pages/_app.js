import { Provider } from 'react-redux';
import { store, persistor } from '../store/store.jsx';
import { PersistGate } from "redux-persist/integration/react";
import Layout from '@/Components/Layout/Layout'
import Head from 'next/head'
import '../../public/styles/styles.css'
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AMZY - Your One-Stop Shop for Quality Products Online</title>
        <meta name='description' content={`Shop at AMZY for a wide selection of quality products at unbeatable prices. Discover the latest in fashion, electronics, home goods, and more. Fast shipping and top-rated customer service make AMZY your go-to e-commerce destination.`} />
        <meta name='keywords' content={`AMZY, online shopping, e-commerce, fashion, electronics, home goods, best online store, quality products, affordable prices, fast shipping, AMZY deals, shop AMZY, best e-commerce site`} />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  )
}

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
        <title>Amzy-Online Shopping Site</title>
        {/* <meta name='description' content={`${data && data.meta_description}`} />
        <meta name='keywords' content={`${data && data.meta_keywords}`} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='shortcut icon' href={`${data && data.favicon}`} /> */}
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

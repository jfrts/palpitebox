import React from 'react';
import Layout from '../components/Layout';
import '../css/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;
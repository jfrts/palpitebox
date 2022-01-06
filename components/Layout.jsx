import React from "react";
import Header from './Header';
import Footer from './Footer';

const main = `container mx-auto p-12 max-w-3xl`

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <main className={main}>
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout;
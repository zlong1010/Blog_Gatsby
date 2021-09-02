import React from 'react';
import Header from '@cmp/header';
import Nav from '@cmp/nav';

const Layout = (props) => {
  return (
    <div className={`c-layout ${props.className}`}>
      <Header />
      <Nav />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;

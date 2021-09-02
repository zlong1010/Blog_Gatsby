import React from 'react';
import Header from '@cmp/header';
import Nav from '@cmp/nav';
import { createCls } from '@/util';
import './index.less';

const prefix = createCls('c-layout');

const Layout = (props) => {
  return (
    <div className={`${prefix('wrap')} ${props.className}`}>
      <Header />
      <div className={prefix('sidebar-content')}>
        <Nav />
        <main className={prefix('content')}>{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;

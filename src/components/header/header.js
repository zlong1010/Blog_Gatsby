import React from 'react';
import { Link } from "gatsby";
import './index.less';

function Header(props){
  return(
    <header className="c-header">
      <Link to="/">首页</Link>
      <span>博客</span>
      <span>Github</span>
    </header>
  );
}

export default Header;
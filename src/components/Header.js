import React from 'react';
import { Link } from "gatsby";

const sty={
  borderBottom: '1px solid #eaecef'
};

function Header(props){
  return(
    <header style={sty}>
      <Link to="/">首页</Link>
      <span>博客</span>
      <span>Github</span>
    </header>
  );
}

export default Header;
import React from "react";
import { Link } from "gatsby";

function Catalog(props) {
  return (
    <aside style={props.sty}>
      目录栏
      <ul>
        <li>
          <Link to="/">Onw</Link>
        </li>
        <li>
          <Link to="/">Two</Link>
        </li>
        <li>
          <Link to="/">Three</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Catalog;
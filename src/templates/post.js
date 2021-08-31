/** 
 * MD文件模板
 */
import React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/Header";
import Catalog from "../components/Catalog";
import "../global.css";
// import Helmet from "react-helmet";

// In Gatsby, query variables can only be used inside of page queries. (You can’t use them with the useStaticQuery hook.)
export const postQuery = graphql`
query BlogPostByPath($slug: String) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      title
    }
    fields {
      slug
    }
    html
    id
    parent {
      ... on File {
        name
        base
        mtime
        sourceInstanceName
      }
    }
  }
}
`;

const styCatalog = {
  border: "solid 1px blue",
  position: "fixed",
};
const styArticle = {
  paddingLeft: "10rem",
};

function Template({ data }) {
  const { markdownRemark: post } = data;
  return (
    <div>
      <Header />
      {/* <h1>{post.frontmatter.title}</h1> */}
      <Catalog sty={styCatalog} />
      <article
        className="border"
        style={styArticle}
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></article>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Template;

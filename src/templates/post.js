// MD文件模板
import React from 'react';
import { Link, graphql } from 'gatsby';
import Header from '../components/header';
import Catalog from '../components/catalog';
import '@style/global.less';
// import Helmet from "react-helmet";

// In Gatsby, query variables can only be used inside of page queries. (You can’t use them with the useStaticQuery hook.)
// $articlePath 的值来源于 createPage 中的 context
export const postQuery = graphql`
  query BlogPostByPath($articlePath: String) {
    markdownRemark(fields: { articlePath: { eq: $articlePath } }) {
      fields {
        articlePath
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

function Template({ data }) {
  const { markdownRemark: post } = data;
  return (
    <div className="page page-article-template">
      <Header />
      <Catalog />
      <article
        className="border"
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></article>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Template;

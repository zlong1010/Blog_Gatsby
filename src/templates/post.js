// MD文件模板
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '@cmp/layout';
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
    <Layout className="page page-article-template">
      <article dangerouslySetInnerHTML={{ __html: post.html }}></article>
    </Layout>
  );
}

export default Template;

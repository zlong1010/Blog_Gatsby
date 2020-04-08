import React from "react";
import { Link } from "gatsby";
// import Layout from "../components/layout";

/**
 * 博客首页
 */
const IndexPage = ({ data }) => (
  <div>
    <h1>Blog Home Page</h1>
    <Link to="/page2">Go to page 2</Link>

    <h2>Index</h2>
    <ul>
      {data.allMarkdownRemark.edges.map(post => (
        <li key={post.node.id}>
          <Link to={post.node.frontmatter.path}>
            {post.node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * 使用graphql读取目录下的文件,传递给IndexPage的data参数
 */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { draft: { eq: false } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

export default IndexPage;

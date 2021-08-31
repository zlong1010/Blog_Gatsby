/**
 * 博客首页
 */
import React from "react";
import { Link } from "gatsby";
import Header from "../components/Header";
// import Layout from "../components/layout";

const HomePage = ({ data }) => (
  <div>
    <Header />
    <main><br/>首<br/>页<br/>内<br/>容...</main>
    <Link to="/other">Go to other</Link>
    <h2>Index</h2>
    <ul className='link-wrap'>
      {data.allMarkdownRemark.nodes.map(node => (
        <li key={node.id}>
          <Link to={node.fields.slug}>
            {node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * 使用graphql读取目录下的文件,传递给HomePage的data参数
 */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { draft: { eq: false } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
        }
        fields {
          slug
        }
        id
      }
    }
  }
`;

export default HomePage;

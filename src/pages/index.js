/**
 * 博客首页
 */
import React from "react";
import { Link } from "gatsby";
import Header from "../components/Header";
import { DateUtil } from '@/util';
import '@style/global.css';

const HomePage = ({ data }) => {
  let articles = data.allMarkdownRemark.nodes;
  articles = articles.sort((a, b) => DateUtil.sort(a.parent.mtime, b.parent.mtime, 'desc'));
  return <div className='page page-home-wrap'>
    <Header />
    <main><br/>首<br/>页<br/>内<br/>容...</main>
    <Link to="/other">Go to other</Link>
    <h2>Index</h2>
    <ul className='link-wrap'>
      {articles.map(node => (
        <li key={node.id}>
          <Link to={node.fields.articlePath}>
            {node.parent.name}
          </Link>
          <span>{ DateUtil.dataToLocaleString(node.parent.mtime)}</span>
        </li>
      ))}
    </ul>
  </div>
};

/**
 * 使用graphql读取目录下的文件,传递给HomePage的data参数
 */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 100
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      nodes {
        id
        fields {
          articlePath
        }
        parent {
          ... on File {
            name
            mtime(formatString: "YYYY/MM/DD hh:mm")
          }
        }
      }
    }
  }
`;

export default HomePage;

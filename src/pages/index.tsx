// 主页
import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "@cmp/layout";
import { DateUtil } from '@/util';
import '@style/global.less';

const HomePage = ({ data }) => {
  let articles = data.allMarkdownRemark.nodes;
  articles = articles.sort((a, b) => DateUtil.sort(a.parent.mtime, b.parent.mtime, 'desc'));
  return <Layout className='page page-home-wrap'>
    <ul className='link-wrap'>
      {articles.map(node => (
        <li key={node.id}>
          <Link to={node.fields.articlePath}>
            {node.parent.name}
          </Link>
          <span className="g-desc" style={{marginLeft: '8px'}}>{ DateUtil.dataToLocaleString(node.parent.mtime)}</span>
        </li>
      ))}
    </ul>
  </Layout>
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

// 主页
import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "@cmp/layout";
import { DateUtil, createCls } from '@/util';
import '@style/global.less';
import '@style/home.less';

const prefix = createCls('page-home');

const HomePage = ({ data }) => {
  let articles = data.allMarkdownRemark.nodes;
  articles = articles.sort((a, b) => DateUtil.sort(a.parent.mtime, b.parent.mtime, 'desc'));
  return <Layout className={`page ${prefix('wrap')}`}>
    {articles.map(node => (
      <section className={prefix('excerpt')} key={node.id}>
        <div className={prefix('excerpt-header')}>
          <Link className={prefix('excerpt-header-title')} to={node.fields.articlePath}>
            {node.parent.name}
          </Link>
          <span className={prefix('excerpt-header-desc')}>{ DateUtil.dataToLocaleString(node.parent.mtime)}</span>
        </div>
        {/* dangerouslySetInnerHTML={{__html: node.excerpt}} */}
        <div className={prefix('excerpt-text')}>{node.excerpt}</div>
      </section>
    ))}
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
        excerpt(format: PLAIN)
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

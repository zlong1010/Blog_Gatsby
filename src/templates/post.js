/** 
 * MD文件模板
 */
import React from "react";
import { Link } from "gatsby";
import Header from "../components/Header";
import Catalog from "../components/Catalog";
import "../global.css";
// import Helmet from "react-helmet";

/* export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`; */
export const postQuery = graphql`
  query BlogPostByPath {
    allMarkdownRemark {
      nodes {
        fields {
          slug
        }
      }
    }
    markdownRemark(frontmatter: { draft: { eq: false } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
      html
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
  const { allMarkdownRemark:articleNodes, markdownRemark: post } = data;
  let articles = articleNodes.nodes;
  let filePath=[];
  articles.map(item => {
    filePath = item.fields.slug.split('/');
    console.log(filePath);
  });

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

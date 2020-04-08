import React from "react";
import { Link } from "gatsby"
// import Helmet from "react-helmet";

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
export default function Template({ data }) {
  const { markdownRemark: post } = data;
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <main dangerouslySetInnerHTML={{__html: post.html}}></main>
      <Link to="/">Home</Link>
    </div>
  );
}

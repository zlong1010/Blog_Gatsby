/*
 * 我们用GraphQL取得所有的文章，用foreach针对每一篇文章使用createPage建立新页面，这里则需要用到path和postTemplate
 */
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

// 向数据源结点中添加自定义数据, 作为URL中的路径, 注意 basePath: 'pages'
exports.onCreateNode = ({ node,getNode,actions }) => {
  if (node.internal.type !== `MarkdownRemark`) return;

  /* const fileNode = getNode(node.parent);
  console.log(`\nrelativePath:`, fileNode.relativePath); */
  const slug = createFilePath({ node, getNode, basePath: `pages` });
  console.log('\n自定义数据:', slug);
  actions.createNodeField({
    node,
    name: 'slug',
    value: slug
  });

};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("src/templates/post.js");
  return graphql(`
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
          html
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors);
    }
    res.data.allMarkdownRemark.nodes.forEach(node => {
      createPage({
        path: node.fields.slug,
        component: postTemplate,
      });
    });
  });
};



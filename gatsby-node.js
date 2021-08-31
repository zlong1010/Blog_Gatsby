/*
 * 我们用GraphQL取得所有的文章，用foreach针对每一篇文章使用createPage建立新页面，这里则需要用到path和postTemplate
 * Each export found in this file will be parsed by Gatsby
 */
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

// 向数据源结点中添加自定义数据, 作为URL中的路径, 注意 basePath: 'pages'
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type !== `MarkdownRemark`) return;

  /* const fileNode = getNode(node.parent);
  console.log(`\nrelativePath:`, fileNode.relativePath); */
  const slug = createFilePath({ node, getNode }); // basePath: 'pages'
  // static
  console.log('\n自定义数据:', slug);
  actions.createNodeField({
    node,
    name: 'slug',
    value: slug,
  });

};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/post.js');
  return graphql(`
    {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
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
        context: { slug: node.fields.slug }, // context 会传递给组件的 props.pageContext 用于 query variables
      });
    });
  });
};



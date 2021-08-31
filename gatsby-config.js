/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Gatsby Blog",
  },
  plugins: [
    // "gatsby-plugin-react-helmet",
    // 添加以下两个插件，一个用于读取md文件，一个用于转换其为html
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/src/pages/articles`,
      },
    },
  ],
}

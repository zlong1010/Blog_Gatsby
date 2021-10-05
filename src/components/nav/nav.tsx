import { graphql, useStaticQuery, Link } from 'gatsby';
import React, { useState } from 'react';
import './index.less';

const NodeType = {
  dir: 'dir',
  file: 'file',
};

// const urlObj = new URL(window.location.href);

function createNode(info, parentNode?) {
  const node = {
    id: info.id,
    type: info.type, // 文件 | 目录
    name: info.name,
    to: info.to,
    child: [],
    parent: parentNode,
  };
  parentNode && parentNode.child.push(node);
  return node;
}
// 根节点
const RootArticle = 'articles';
const RootNode = createNode({
  id: RootArticle,
  type: NodeType.dir,
  name: '目录',
});

// 遍历树
function traverse(root, targetId) {
  if (!root || !targetId) return { end: true, node: null };
  if (root.id === targetId) return { end: true, node: root };
  let result = null;
  const childs = root.child || [];
  for (let i = 0; i < childs.length; i++) {
    result = traverse(childs[i], targetId);
    if (result.end) {
      return result;
    }
  }
  return { end: false, node: null };
}

const queryDir = graphql`
  query AllDir {
    allMarkdownRemark {
      nodes {
        id
        fields {
          articlePath
        }
        parent {
          ... on File {
            base
            name
            relativeDirectory
          }
        }
      }
    }
  }
`;

const NavItem = ({ node, urlPath }) => {
  let initExpand = false;
  if (window.sessionStorage.getItem(node.id) === '1' || new RegExp(node.id).test(urlPath)) {
    initExpand = true;
  }
  const [expand, setExpand] = useState(initExpand);

  const handleClick = () => {
    setExpand(!expand);
    window.sessionStorage.setItem(node.id, expand ? '0' : '1');
  }
  if (node.type === NodeType.file) {
    return <Link to={node.to} className="file-name">{node.name}</Link>;
  }
  return (
    <div className={`file-item fold ${expand ? 'expand' : ''}`}>
      <div onClick={handleClick} className="file-name">{node.name}</div>
      {
        <ul className="child-list">
          {node.child.map(childNode => (
            <NavItem node={childNode} urlPath={urlPath} key={childNode.id} />
          ))}
        </ul>
      }
    </div>
  );
};

const Nav = props => {
  if (props.children) {
    return props.children;
  }
  const data = useStaticQuery(queryDir);
  let dirList = [];
  const articleArr = data.allMarkdownRemark.nodes;
  articleArr.forEach(file => {
    const { base, relativeDirectory } = file.parent;
    dirList = relativeDirectory.split('/');
    dirList.push(base);
    // ['articles', '子目录', 'one']
    let id = '';
    let type = '';
    let result = null;
    let parentNode = null;
    let to = '';
    dirList.forEach((item, idx) => {
      id = dirList.slice(0, idx + 1).join('-');
      type = NodeType.dir;
      to = '';
      if (idx === dirList.length - 1) {
        type = NodeType.file;
        to = file.fields.articlePath;
      }
      result = traverse(RootNode, id);
      // 已经存在
      if (!result.node) {
        result.node = createNode({ id, type, name: item, to }, parentNode);
      }
      parentNode = result.node;
    });
  });
  const childs = [...RootNode.child].sort(fileSort);
  let urlPath = decodeURIComponent(window.location.pathname).replace(/\//g, '-')
  urlPath = urlPath.replace(/^\-|\-$/g, '');
  return (
    <div className="c-nav">
      {childs.map(node => (
        <NavItem node={node} urlPath={urlPath} key={node.id}></NavItem>
      ))}
    </div>
  );
};

function fileSort(a, b) {
  if (a.type === b.type) {
    return 0;
  }
  if (a.type === NodeType.dir) {
    return -1;
  }
  return 1;
}

export default Nav;

import * as DateUtil from "./date";

export { DateUtil };


// 生成带命名空间的 className 字符串
// 支持对象类型和不限数量的 modifier，例如：
// const cls = createCls('namespace')
// cls('className')
// cls('className', 'modifier1', 'modifier2')
// cls('className', {'modifier1': true, 'modifier2': false}, 'modifier3')
export const createCls = (namespace) => (
  className: string,
  ...modifiers: Array<string | number | object>
) => {
  let primitiveResult = `${namespace}-${className}`;
  const modifierResult = modifiers.map(makeObjectClassName(primitiveResult)).join(' ');
  return primitiveResult + ' ' + modifierResult;
};

const makeObjectClassName = (primitiveResult: String) => (modifier) => {
  let result = "";
  if (typeof modifier === "string") {
    result = `${primitiveResult}--${modifier}`;
  } else {
    let keys = Object.keys(modifier).filter((k) => modifier[k]);
    keys.forEach((m) => (result += `${primitiveResult}--${m}`));
  }
  return result;
};
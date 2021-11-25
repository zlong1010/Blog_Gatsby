import React, { useEffect, useRef } from 'react';
import '@style/debug.less';

function Debug() {
  let timer = null;
  let offset = 0;
  const ele = useRef(null);
  // 动画
  const updateAnimate = () => {
    offset += 5;
    ele.current.style.transform = `translateX(${offset}px)`;
    if (offset >= 300) {
      clearInterval(timer);
      timer = null;
    }
    // if (offset < 300) {
    //   setTimeout(updateAnimate, 100);
    // }
    // 2.
    // console.log('time: ', timeStampt);
    // offset += 5;
    // ele.current.style.transform = `translateX(${offset}px)`;
    // if (offset < 300) {
    //   requestAnimationFrame(updateAnimate);
    // }
  };
  useEffect(() => {
    console.log('ele=>', ele.current);
    timer = setInterval(updateAnimate);
    // updateAnimate();
    // requestAnimationFrame(updateAnimate);
  });
  return (
    <div className="p-debug">
      <div ref={ele} className="float">float</div>
      <div className="content">
        <h2>斐林试剂佛时间段佛为非见识到了福建安山东解耦就爱上了对方</h2>
      </div>
      <button onClick={()=>{}}>debug</button>
      <h2>两端对齐</h2>
      <div className="align-wrap">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <p>asdfsadfasdfsdf</p>
      </div>
    </div>
  );
}

export default Debug;

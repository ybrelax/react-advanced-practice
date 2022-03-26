import React, { useEffect, useRef } from 'react';

const HOC = (Component: Index) => {
  class Wrap extends React.Component<{
    forwardedRef: unknown;
  }> {
    render() {
      const { forwardedRef, ...otherprops } = this.props;
      // Function components cannot be given refs 函数组件不能这么传递
      return <Component ref={forwardedRef} {...otherprops} />;
    }
  }
  return React.forwardRef((props, ref) => (
    <Wrap forwardedRef={ref} {...props} />
  ));
};

class Index extends React.Component {
  render() {
    return <div>hello,world</div>;
  }
}

const TestIndex: React.FC = () => {
  return <div>测试</div>;
};

const TestIndexHOC = HOC(Index);

const Home: React.FC = () => {
  const ref = useRef();
  const indexRef = useRef<Index | null>(null);
  const indexTestRef = useRef(null);

  useEffect(() => {
    console.log('获取的ref信息:', ref);
    console.log('获取indexRef：', indexRef);
    console.log('获取indexTestRef:', indexTestRef);
  }, []);

  return (
    <div>
      <Index ref={indexRef} />
      {/* <TestIndex ref={indexTestRef} /> */}
      <TestIndexHOC ref={ref} />
    </div>
  );
};

export default Home;

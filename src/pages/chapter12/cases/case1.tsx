import React, { Suspense } from 'react';

const AsyncComponent = (Component, api) => {
  const AsyncComponentPromise = () =>
    new Promise(async (resolve) => {
      const res = await api();
      console.log('result:', res);
      resolve({
        default: (props) => <Component {...props} {...res} />,
      });
    });
  return React.lazy(AsyncComponentPromise);
};

const TestDemo: React.FC = () => {
  console.log('渲染 testDeom');
  return <div>234</div>;
};

const Case1: React.FC = () => {
  const getData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'test',
        });
      }, 3000);
    });
  };

  const Component = AsyncComponent(TestDemo, getData);

  return (
    <div>
      2132
      <Suspense fallback={<div>loading </div>}>
        <Component />
      </Suspense>
    </div>
  );
};

export default Case1;

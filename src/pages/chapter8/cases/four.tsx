import React from 'react';
import FourSon from './four-son';

const ConsumerFun: React.FC = () => {
  console.log('render 4');
  return (
    <div>
      Consumer Fun
      <FourSon />
    </div>
  );
};

// export default React.memo(() => <ConsumerFun />);
export default ConsumerFun;

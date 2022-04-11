import React, { useContext } from 'react';
import Context from '../context';

const ConsumerFun: React.FC = () => {
  console.log('render4 son')
  const contextValue = useContext(Context);
  return <div>Consumer Fun {contextValue}</div>;
};

export default React.memo(() => <ConsumerFun />);

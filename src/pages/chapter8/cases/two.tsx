import React, { useContext } from 'react';
import Context from '../context';

const ConsumerFun: React.FC = () => {
  const contextValue = useContext(Context);

  return <div>
      Consumer Fun {contextValue}
      
  </div>

};

export default ConsumerFun;

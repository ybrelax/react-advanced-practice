import React, { useContext } from 'react';
import Context from '../context';
import Context1 from '../context1';

const ConsumerFun: React.FC = () => {
  return (
    <Context.Consumer>
      {(value) => (
        <Context1.Consumer>
          {(value1) => {
              console.log('xxvalue1:', value1)
              return (
                <div>
                  <p>value {value}</p>
                  <p>value1 {value1}</p>
                </div>
              )
          }}
        </Context1.Consumer>
      )}
    </Context.Consumer>
  );
};

// export default ConsumerFun;
export default React.memo(() => <ConsumerFun />);

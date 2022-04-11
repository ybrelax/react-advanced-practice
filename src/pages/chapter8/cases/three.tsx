import React from 'react';
import Context from '../context';

const ConsumerFun: React.FC<{ context: string }> = (props) => {
  return <div>Consumer Fun {props.context} </div>;
};

const x = () => (
  <Context.Consumer>
    {(context) => <ConsumerFun context={context} />}
  </Context.Consumer>
);

export default x;

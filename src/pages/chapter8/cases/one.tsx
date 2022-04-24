import React from 'react';
import Context from '../context';

class ConsumerClass extends React.Component {
  render() {
    return <div>ConsumerClass value {this.context}</div>;
  }
}
// 必须接收
ConsumerClass.contextType = Context;

export default ConsumerClass;

import React from 'react';
import Context from "../context";

class ConsumerClass extends React.Component {
  render() {
    return <div>ConsumerClass value {this.context}</div>;
  }
}

ConsumerClass.contextType = Context;

export default ConsumerClass;

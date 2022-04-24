import React, { LegacyRef, useRef } from 'react';

type RefType = LegacyRef<HTMLElement> | undefined;

const Son: React.FC<{ grandRef: RefType }> = (props) => {
  const ref = useRef();
  return (
    <div>
      <span ref={props.grandRef}>我是son</span>
    </div>
  );
};

class Fatcher extends React.Component<{
  grandRef: RefType;
}> {
  render() {
    return <Son grandRef={this.props.grandRef}></Son>;
  }
}

const NewFather = React.forwardRef((props, ref: RefType) => (
  <Fatcher grandRef={ref} {...props}></Fatcher>
));

export default class GrandFatcher extends React.Component {
  private node: null | unknown = null;

  componentDidMount() {
    console.log('node', this.node);
    console.log('node1:', this.refs);
  }

  render() {
    return (
      <>
        <NewFather ref={(node) => (this.node = node)} />
        <div ref="node1">123</div>
      </>
    );
  }
}

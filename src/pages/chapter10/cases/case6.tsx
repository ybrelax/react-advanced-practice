import React from 'react';

interface CaseType {
  text?: string;
}

const HOC = (
  WrapComponent: React.FC<CaseType> | React.ComponentClass<CaseType>,
) => {
  return class AdvanceComponent extends React.Component<CaseType> {
    render() {
      return (
        <div>
          hoc: <WrapComponent {...this.props} />
        </div>
      );
    }
  };
};

const HOC1 = (
  WrapComponent: React.FC<CaseType> | React.ComponentClass<CaseType>,
) => {
  return class AdvanceComponent extends React.Component<CaseType> {
    render() {
      return (
        <div>
          hoc1: <WrapComponent {...this.props} />
        </div>
      );
    }
  };
};

@HOC1
@HOC
class Content extends React.Component<CaseType> {
  render() {
    return <div>content: {this.props.text}</div>;
  }
}

class Case6 extends React.Component {
  render() {
    return (
      <div>
        <Content text={'this is case6 message'} />
      </div>
    );
  }
}

export default Case6;

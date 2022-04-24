import React from 'react';

interface CaseType {
  text?: string;
  hocText?: string;
}

const HOC = (WrapComponent: React.FC<CaseType>) => {
  const text = 'this is hoc message';
  return class AdvanceComponent extends React.Component {
    render() {
      return <WrapComponent {...this.props} hocText={text} />;
    }
  };
};

const Case1: React.FC<CaseType> = (props) => {
  return (
    <div>
      正向代理(props text): {props.text}
      正向代理(hoc text): {props.hocText}
    </div>
  );
};

export default HOC(Case1) as unknown as React.FC<CaseType>;

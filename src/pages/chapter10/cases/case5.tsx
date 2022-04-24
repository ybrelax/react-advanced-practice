import React from 'react';

interface CaseType {
  text?: string;
}

const HOC = (
  WrapComponent: React.FC<CaseType> | React.ComponentClass<CaseType>,
) => {
  return class AdvanceComponent extends React.Component<CaseType> {
    render() {
      return <WrapComponent {...this.props} />;
    }
  };
};

class Content extends React.Component<CaseType> {
  render() {
    return <div>content: {this.props.text}</div>;
  }
}

const Case5: React.FC = () => {
  const HocContent = HOC(Content);
  return (
    <div>
      <HocContent text={'this is case5 message'} />
    </div>
  );
};

// class Case5 extends React.Component {
//   render() {
//     const HocContent = HOC(Content);
//     return <div>
//         <HocContent text={'this is case5 message'} />
//     </div>;
//   }
// }

export default Case5;

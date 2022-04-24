import React from 'react';

interface CaseType {
  isAuth?: boolean;
  text?: string;
  hocText?: string;
}

const HOC = (WrapComponent: React.FC<CaseType>) => {
  const text = 'this is hoc message';
  return class AdvanceComponent extends React.Component<CaseType> {
    render() {
      const { isAuth } = this.props;
      return isAuth ? (
        <div>
          <WrapComponent {...this.props} hocText={text} />
        </div>
      ) : (
        <div>没有权限，无权访问</div>
      );
    }
  };
};

const Case2: React.FC<CaseType> = (props) => {
  return (
    <div>
      属性代理(props text): {props.text}
      属性代理(hoc text): {props.hocText}
    </div>
  );
};

export default HOC(Case2) as unknown as React.FC<CaseType>;

import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

interface CaseType {
  isAuth?: boolean;
  text?: string;
  hocText?: string;
}

const HOC = (WrapComponent: React.FC<CaseType>) => {
  const text = 'this is hoc message';

  class AdvanceComponent extends React.Component<CaseType> {
    static staticTestName: string;
    componentDidMount() {
      console.log('did mount:', AdvanceComponent.staticTestName);
    }

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
  }
  // hoistNonReactStatic(AdvanceComponent, WrapComponent)
  // AdvanceComponent.staticTestName = WrapComponent.staticTestName;
  return AdvanceComponent;
};

const Content: React.FC<CaseType> = (props) => {
  return (
    <div>
      属性代理(props text): {props.text}
      属性代理(hoc text): {props.hocText}
    </div>
  );
};

Content.staticTestName = '2343';

const HocContent = HOC(Content);

const Case7: React.FC = () => {
  return (
    <div>
      <HocContent />
    </div>
  );
};

export default Case7;

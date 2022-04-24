import React from 'react';

const HOC = (component: React.ComponentClass<{ text: string }>) => {
  const preComponentDidMount = component.prototype.componentDidMount;
  component.prototype.componentDidMount = function () {
    console.log('劫持 生命周期 HOC', this.props);
    preComponentDidMount.call({ props: { text: 3444 } });
  };
  return component as unknown as typeof Content;
};

@HOC
class Content extends React.Component<{ text: string }> {
  componentDidMount() {
    console.log('case4 componentDidMount:', this);
  }

  render() {
    return <div>case4</div>;
  }
}

const HOC1 = (component: React.ComponentClass<{ text: string }>) => {
  const num = 10;

  const preComponentDidMount = component.prototype.componentDidMount;
  component.prototype.componentDidMount = () => {
    console.log('劫持 生命周期 HOC1', this);
    preComponentDidMount.call({ props: { text: 222 } });
  };

  return component as unknown as typeof Content;
};

const Content1 = HOC1(Content);

const Case4: React.FC = () => {
  return (
    <div>
      <Content1 text={'this is case4 message'} />
    </div>
  );
};

export default Case4;

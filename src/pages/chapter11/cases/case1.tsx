import React from 'react';
import { Button } from 'antd';

class ChildComponent extends React.Component<{ num: number }> {
  render() {
    console.log('子组件渲染');
    return <div>child content</div>;
  }
}

class Case1 extends React.Component<any, { num: number; num1: number }> {
  childComponent: JSX.Element;
  constructor(props: any) {
    super(props);
    this.state = {
      num: 1,
      num1: 1,
    };
    this.childComponent = <ChildComponent num={this.state.num} />;
  }

  renderChildComponent = () => {
    const { props } = this.childComponent;
    if (props.num === this.state.num) {
      return React.cloneElement(this.childComponent, { num: this.state.num });
    }
    return this.childComponent;
  };

  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <p>{this.state.num1}</p>
        {this.renderChildComponent()}
        <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
          点击
        </Button>
        <Button onClick={() => this.setState({ num1: this.state.num1 + 1 })}>
          {' '}
          点击1
        </Button>
      </div>
    );
  }
}

export default Case1;

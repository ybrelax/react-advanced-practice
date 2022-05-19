import React from 'react';
import { Button } from 'antd';

class ChildComponent extends React.PureComponent<{ num: number }> {
  state = {
    name: 'ybrelax',
    num: 1,
    obj: {
      num: 1,
    },
  };

  render() {
    console.log('子组件渲染');
    return (
      <div>
        child content
        <Button onClick={() => this.setState({ name: 'ybrelax' })}>
          state 不变更
        </Button>
        <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
          state 变更
        </Button>
        <Button
          onClick={() => {
            this.state.obj.num = this.state.obj.num + 1;
            this.setState({ obj: this.state.obj });
            // this.setState({ obj: { num: this.state.obj.num + 1 } });
          }}
        >
          state 引用类型变更
        </Button>
      </div>
    );
  }
}

class Case3 extends React.Component<any, { num: number; num1: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      num: 1,
      num1: 1,
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <p>{this.state.num1}</p>
        <ChildComponent num={this.state.num} />
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

export default Case3;

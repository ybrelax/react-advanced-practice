import React from 'react';
import { Button } from 'antd';

const TestDemo: React.FC<{ num?: number }> = (props) => {
  console.log('更新了');
  return <div>num: {props.num}</div>;
};

const MemoTestDemo = React.memo(TestDemo, (pre, cur) => {
  console.log(pre, cur);
  if (pre.num === cur.num) {
    return true;
  }
  return false;
});

class PureDemo extends React.PureComponent {
  state = {
    num: 1,
  };

  render() {
    console.log('更新了');
    return (
      <div>
        {Math.random()}
        <Button
          onClick={() => {
            this.forceUpdate();
            this.setState({ num: 1 });
          }}
        >
          click
        </Button>
      </div>
    );
  }
}

class Case6 extends React.Component {
  state = {
    num: 1,
    num2: 1,
  };

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (
      <div>
        <p>num2: {this.state.num2}</p>
        <MemoTestDemo num={this.state.num} />
        <PureDemo />
        <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
          click
        </Button>
        <Button
          onClick={() => {
            this.forceUpdate();
            // this.setState({ num2: this.state.num2 + 1 })
          }}
        >
          click2
        </Button>
      </div>
    );
  }
}

export default Case6;

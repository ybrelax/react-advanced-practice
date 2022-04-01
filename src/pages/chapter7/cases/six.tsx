import { Button } from 'antd';
import React from 'react';

export default class Index extends React.Component {
  state = {
    num: 1,
  };
  node: HTMLDivElement | null = null;

  private getDom = (e: HTMLDivElement) => {
    this.node = e;
    console.log('getDom:', this.node);
  };

  render() {
    return (
      <div
        ref={this.getDom}
        // ref={(e) => {
        //   this.node = e;
        //   console.log('ref:', this.node);
        // }}
      >
        <Button
          type="primary"
          onClick={() => this.setState({ num: this.state.num + 1 })}
        >
          点击
        </Button>
      </div>
    );
  }
}

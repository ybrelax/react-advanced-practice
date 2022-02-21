import React from 'react';
import { Button, Space } from 'antd';

export default class CharterFour extends React.Component {
  state = {
    number: 1,
  };

  // 同步点击
  private hanldClick = () => {
    this.setState({ number:this.state.number + 1  }, () =>
      console.log('callback1: ', this.state.number),
    );
    console.log('state one: ', this.state.number);
    this.setState({ number:this.state.number + 1  }, () =>
      console.log('callback2: ', this.state.number),
    );
    console.log('state two: ', this.state.number);
    this.setState({ number:this.state.number + 1  }, () =>
      console.log('callback3: ', this.state.number),
    );
    console.log('state three: ', this.state.number);
  };

  // 异步点击
  private hanldClickAsync = () => {
    console.log('异步调用：')
    setTimeout(() => {
      this.setState({ number:this.state.number + 1  }, () =>
        console.log('callback1: ', this.state.number),
      );
      console.log('state one: ', this.state.number);
      this.setState({ number:this.state.number + 1  }, () =>
        console.log('callback2: ', this.state.number),
      );
      console.log('state two: ', this.state.number);
      this.setState({ number:this.state.number + 1  }, () =>
        console.log('callback3: ', this.state.number),
      );
      console.log('state three: ', this.state.number);
    });
  };

  render() {
    return (
      <div>
        <Space>
          <Button type="primary" onClick={() => this.hanldClick()}>
            点击
          </Button>
          <Button type="primary" onClick={() => this.hanldClickAsync()}>
            异步点击
          </Button>
        </Space>
      </div>
    );
  }
}

// export const function ChapterFour() {

//   return (
//     <div>

//     </div>
//   );
// }

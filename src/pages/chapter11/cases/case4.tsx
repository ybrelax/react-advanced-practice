import React, { useCallback, useState } from 'react';
import { Button } from 'antd';

class ChildComponent extends React.PureComponent<{
  num?: number;
  handleClick: Function;
}> {
  render() {
    console.log('子组件渲染');
    return <div>child content</div>;
  }
}

// class Case4 extends React.Component<any, { num: number; num1: number }> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       num: 1,
//       num1: 1,
//     };
//   }

//   render() {
//     const Child = () => <ChildComponent num={this.state.num} />;
//     return (
//       <div>
//         <p>{this.state.num}</p>
//         <p>{this.state.num1}</p>
//         <Child />
//         <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
//           点击
//         </Button>
//         <Button onClick={() => this.setState({ num1: this.state.num1 + 1 })}>
//           点击1
//         </Button>
//       </div>
//     );
//   }
// }

const Case4: React.FC = () => {
  const [num, setNum] = useState(0);
  const handleClick = () => {};
  const handleClickMemo = useCallback(handleClick, []);
  return (
    <div>
      <ChildComponent handleClick={handleClickMemo} />
      <div>{num}</div>
      <Button onClick={() => setNum(num + 1)}>点击</Button>
    </div>
  );
};

export default Case4;

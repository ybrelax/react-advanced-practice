import React, { useMemo, useState } from 'react';
import { Button } from 'antd';

class ChildComponent extends React.Component<{ num: number }> {
  render() {
    console.log('子组件渲染');
    return <div>child content</div>;
  }
}
const Case2: React.FC = () => {
  const [num, setNum] = useState(0);
  const [num1, setNum1] = useState(0);

  return (
    <div>
      <p>{num}</p>
      <p>{num1}</p>
      {useMemo(
        () => (
          <ChildComponent num={num} />
        ),
        [num],
      )}
      <Button onClick={() => setNum(num + 1)}>点击</Button>
      <Button onClick={() => setNum1(num1 + 1)}> 点击1</Button>
    </div>
  );
};

export default Case2;

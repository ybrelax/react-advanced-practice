import React, { useState, useRef } from 'react';
import { Button, Input } from 'antd';

// 子组件
class Son extends React.PureComponent<{
  sayFather: (arg: string) => void;
}> {
  state = {
    fatherMsg: '',
    sonMsg: '',
  };

  fatherSay = (fatherMsg: string) => this.setState({ fatherMsg });

  render() {
    return (
      <div>
        <div>父亲对我说: {this.state.fatherMsg}</div>
        <Input
          onChange={(e) =>
            this.setState({
              sonMsg: e.currentTarget.value,
            })
          }
        ></Input>
        <Button onClick={() => this.props.sayFather(this.state.sonMsg)}>
          对父亲说
        </Button>
      </div>
    );
  }
}

const Father: React.FC = () => {
  const sonInstanceRef = useRef<Son | null>(null);
  const [fatherMsg, setFatherMsg] = useState<string>('');
  const [sonMsg, setSonMsg] = useState<string>('');
  const toSon = (msg: string) => sonInstanceRef.current?.fatherSay(msg);

  return (
    <div>
      <div>儿子对父亲说: {sonMsg} </div>
      <Input onChange={(e) => setFatherMsg(e.currentTarget.value)}></Input>
      <Button onClick={() => toSon(fatherMsg)}>对儿子说</Button>
      <Son ref={sonInstanceRef} sayFather={setSonMsg} />
     
    </div>
  );
};

export default Father;

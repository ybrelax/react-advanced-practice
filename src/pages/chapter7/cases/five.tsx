import { Input, Button } from 'antd';
import React, { useState, useRef, useImperativeHandle } from 'react';

interface SonType {
  fatherSay: (val: string) => void;
}

const Son: React.FC<SonType> = (props, ref) => {
  const [sonMsg, setSonMsg] = useState('');
  const [fatherMsg, setFatherMsg] = useState('');

  useImperativeHandle(
    ref,
    () => {
      return {
        fatherSay: (msg: string) => {
          setFatherMsg(msg);
        },
      };
    },
    [],
  );

  return (
    <div>
      <div>父亲对我说: {fatherMsg}</div>
      <Input onChange={(e) => setSonMsg(e.currentTarget.value)}></Input>
      <Button onClick={() => props.fatherSay(sonMsg)}>对父亲说</Button>
    </div>
  );
};

const ForwardSon = React.forwardRef((props: SonType, ref) => Son(props, ref));

const Father: React.FC = () => {
  const sonInstanceRef = useRef<SonType | null>(null);
  const [sonMsg, setSonMsg] = useState('');
  const [fatherMsg, setFatherMsg] = useState('');

  const toSon = (msg: string) => sonInstanceRef.current?.fatherSay(msg);
  return (
    <div>
      <p>儿子父亲说：{sonMsg}</p>
      <Input onChange={(e) => setFatherMsg(e.currentTarget.value)}></Input>
      <Button onClick={() => toSon(fatherMsg)}>对儿子说</Button>
      <ForwardSon ref={sonInstanceRef} fatherSay={setSonMsg} />
    </div>
  );
};

export default Father;

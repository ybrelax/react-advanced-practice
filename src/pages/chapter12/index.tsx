import React, { useRef, useState } from 'react';
import { Tabs, Button } from 'antd';
import Case1 from './cases/case1';
import Case2 from './cases/case2';

const { TabPane } = Tabs;

const Chapter11: React.FC = () => {
  const case7Ref = useRef();
  const [count, setCount] = useState(0);
  const [activeKey, setActiveKey] = useState('1');

  return (
    <div>
      <Button type="primary" onClick={() => setCount(count + 1)}>
        重新触发
      </Button>
      <Tabs
        key={count}
        activeKey={activeKey}
        onChange={(val) => setActiveKey(val)}
      >
        <TabPane tab="优化案例1" key="1">
          <Case1 />
        </TabPane>
        <TabPane tab="优化案例2" key="2">
          <Case2 />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Chapter11;

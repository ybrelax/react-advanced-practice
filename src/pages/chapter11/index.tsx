import React, { useRef, useState } from 'react';
import { Tabs, Button } from 'antd';
import Case1 from './cases/case1';
import Case2 from './cases/case2';
import Case3 from './cases/case3';
import Case4 from './cases/case4';
import Case5 from './cases/case5';
import Case6 from './cases/case6';
import Case7 from './cases/case7';

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
        <TabPane tab="优化案例3" key="3">
          <Case3 />
        </TabPane>
        <TabPane tab="优化案例4" key="4">
          <Case4 />
        </TabPane>
        <TabPane tab="优化案例5" key="5">
          <Case5 />
        </TabPane>
        <TabPane tab="优化案例6" key="6">
          <Case6 />
        </TabPane>
        <TabPane tab="优化案例7" key="7">
          <Case7 />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Chapter11;

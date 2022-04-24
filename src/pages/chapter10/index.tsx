import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import Case1 from './cases/case1';
import Case2 from './cases/case2';
import Case3 from './cases/case3';
import Case4 from './cases/case4';
import Case5 from './cases/case5';
import Case6 from './cases/case6';
import Case7 from './cases/case7';

const { TabPane } = Tabs;

const Chapter10: React.FC = () => {
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
        <TabPane tab="正向代理" key="1">
          <Case1 text="123" />
        </TabPane>
        <TabPane tab="属性代理" key="2">
          <Case2 isAuth={true} />
          <Case2 isAuth={false} />
        </TabPane>
        <TabPane tab="事件代理" key="3">
          <Case3 />
        </TabPane>
        <TabPane tab="属性劫持" key="4">
          <Case4 />
        </TabPane>
        <TabPane tab="render 方式" key="5">
          <Case5 />
        </TabPane>
        <TabPane tab="多个hoc嵌套" key="6">
          <Case6 />
        </TabPane>
        <TabPane tab="静态属性" key="7">
          <Case7 />
        </TabPane>
      </Tabs>
    </div>
  );
};

// 根据名字获取dom

export default Chapter10;

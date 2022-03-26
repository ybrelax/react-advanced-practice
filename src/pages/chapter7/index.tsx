import React from 'react';
import { Tabs, Button } from 'antd';
import CaseOne from './cases/one';
import CaseTwo from './cases/two';
import CaseThree from "./cases/three"

const { TabPane } = Tabs;

/* props 定义绑定 */
class Index extends React.Component {
  state = {
    value: '1',
    randomNum: 1,
  };
  node = null;
  say = () => this.setState({ mes: 'let us learn React!' });
  render() {
    return (
      <Tabs
        key={this.state.randomNum}
        activeKey={this.state.value}
        onChange={(val) => {
          /^[0-9]$/.test(val) ? this.setState({ value: val }) : null;
        }}
      >
        <TabPane tab="跨层级获取" tabKey="1" key="1">
          <CaseOne />
        </TabPane>
        <TabPane tab="合并转发ref" tabKey="2" key="2">
          <CaseTwo />
        </TabPane>
        <TabPane tab="高阶组件转发" key="3">
          <CaseThree />
        </TabPane>
        <TabPane
          tab={
            <Button
              onClick={() => {
                this.setState({ randomNum: Math.random() });
              }}
            >
              重新触发
            </Button>
          }
          key="refresh"
        />
      </Tabs>
    );
  }
}

export default Index;

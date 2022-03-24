import React from 'react';
import { Tabs, Button } from 'antd';
import CaseOne from './cases/one';
import CaseTwo from './cases/two';

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
        onChange={(val) =>
         {
              /^[0-9]$/.test(val) ? this.setState({ value: val }) : null
         }
        }
      >
        <TabPane tab="案例一" tabKey="1" key="1">
          <CaseOne />
        </TabPane>
        <TabPane tab="two" tabKey="2" key="2">
          <CaseTwo />
        </TabPane>
        <TabPane tab="表单" key="3"></TabPane>
        <TabPane
          tab={
            <Button
              onClick={() => {
                this.setState({ randomNum: Math.random() });
              }}
            >
              刷新
            </Button>
          }
          key="refresh"
        />
      </Tabs>
    );
  }
}

export default Index;

import React from 'react';
import { Tabs } from 'antd';
import OneComponent from './components/one';
import TwoComponent from './components/two';
import Form, { FormItem, Input } from './form/index';

const { TabPane } = Tabs;

/* props 定义绑定 */
class Index extends React.Component {
  state = {
    mes: 'hello,React',
  };
  node = null;
  say = () => this.setState({ mes: 'let us learn React!' });
  render() {
    return (
      <Tabs>
        <TabPane tab="one" tabKey="1" key="1">
          <OneComponent />
        </TabPane>
        <TabPane tab="two" tabKey="2" key="2">
          <TwoComponent />
        </TabPane>
        <TabPane tab="表单" key="3">
          <Form>
            <FormItem name="test" label="表格">
              <Input />
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    );
  }
}

export default Index;

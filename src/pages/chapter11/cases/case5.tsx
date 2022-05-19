import React from 'react';
import Immutable from 'immutable';
import { Button } from 'antd';

class Case5 extends React.Component {
  state = {
    num: 1,
    numObj: {
      value: 123,
    },
  };

  shouldComponentUpdate(preProps: any, preState: any) {
    // if (preState.num === this.state.num) {
    //     return false;
    // }
    if (preState.numObj !== this.state.numObj) {
      console.log('变更了');
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <p>num: {this.state.num}</p>
        <p>numObj: {this.state.numObj.value}</p>
        <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
          one
        </Button>
        <Button
          onClick={() => {
            const numObj = Immutable.Map(this.state.numObj);
            this.setState({
              numObj: numObj.set('value', Math.random()).toJS(),
            });
          }}
        >
          two
        </Button>
      </div>
    );
  }
}

export default Case5;

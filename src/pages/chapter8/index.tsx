import React from 'react';
import Context from './context';
import CaseOne from './cases/one';

class ContextDemo extends React.Component {
  state = {
    value: 'this comes from context message',
  };

  render() {
    return (
      <div>
        <Context.Provider value={this.state.value}>
          <CaseOne />
        </Context.Provider>
      </div>
    );
  }
}

export default ContextDemo;

import React from 'react';

const Test: React.FC = () => {
  return;
};

// class Case2 extends React.Component {
//   state = {
//     hasError: false,
//   };

//   componentDidCatch(...arg: any[]) {
//     console.log('info:', arg);
//     this.setState({
//       hasError: true,
//     });
//   }

//   render() {
//     return (
//       <div>
//         23
//         {!this.state.hasError ? <Test /> : 'error'}
//       </div>
//     );
//   }
// }

class Case2 extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(...arg: any[]) {
    console.log('info:', arg);
    return {
      hasError: true,
    };
  }

  render() {
    return (
      <div>
        231
        {!this.state.hasError ? <Test /> : 'error'}
      </div>
    );
  }
}

export default Case2;

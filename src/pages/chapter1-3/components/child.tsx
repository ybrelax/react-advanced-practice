import React from "react";

class Child extends React.Component<any> {
  //   constructor(props:any) {
  //     super(props);
  //     console.log('props:', this.props)
  //   }

  static num = 1;
  handClick = () => console.log("click 1");

  componentDidMount() {
    // console.log('did mount props:', this.props)
    console.log(Child.num);
  }

  render() {
    /* 以下都是常用的jsx元素节 */
    return (
      <div>
        这是子元素
        <button onClick={this.handClick.bind(this)}>点击</button>
      </div>
    );
  }
}

Child.num = 2;
Child.prototype.handClick = () => console.log("click 2");

export default Child;

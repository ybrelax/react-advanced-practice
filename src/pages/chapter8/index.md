深入理解context

### 简介
我们都知道props的传值方式是父子节点这样一级一级往下传数据的，但是如果是跨节点去传递参数就显得很麻烦，所以就有了context;
context提供了“提供者”和“消费者”一说。提供者必须位于消费者之前，这样消费者才能获取数据。

### 获取消费者的三种方式

首先创建一个context

```ts
import React from 'react';
const context = React.createContext('');
export default context
```

再创建一个提供者

```ts
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
```

#### 1. 类组件接受方式
```ts
import Context from "../context";

class ConsumerClass extends React.Component {
  render() {
    return <div>ConsumerClass value {this.context}</div>;
  }
}
// 必须接收
ConsumerClass.contextType = Context;

export default ConsumerClass;
```
* 类组件通过一个静态变量contextType来接受provider来的值，然后再通过 **this.context** 来接收  

#### 2. 函数组件接受方式
```ts
import Context from '../context';

const ConsumerFun: React.FC = () => {
  const contextValue = useContext(Context);
  return <div>
      Consumer Fun {contextValue}
  </div>

};
export default ConsumerFun;

```
* 函数组件通过 **useContext** 来接收provider来的值

#### 3.订阅制模式 
```ts
const ConsumerFun: React.FC<{ context: string }> = (props) => {
  return <div>Consumer Fun {props.context} </div>;
};

const x = () => (
  <Context.Consumer>
    {(context) => <ConsumerFun context={context} />}
  </Context.Consumer>
);

export default x;
```
* 这种模式就是通过consumer包一层，然后将context的值通过props来往下一级传递

#### 问题
```ts
// index.tsx
<Context.Provider value={this.state.value}>
   <CaseFour />
</Context.Provider>

// son
const ConsumerFun: React.FC = () => {
  console.log('render 4');
  return (
    <div>
      Consumer Fun
      <FourSon />
    </div>
  );
};

// export default React.memo(() => <ConsumerFun />);
export default ConsumerFun;

// grandson
const ConsumerFun: React.FC = () => {
  console.log('render4 son')
  const contextValue = useContext(Context);
  return <div>Consumer Fun {contextValue}</div>;
};

export default React.memo(() => <ConsumerFun />);
```
  以上代码存在多级组件的时候，那如果只要该组件消费的provider提供的值，那么就会导致一层一层往下更新，这其实不是我们想看到的; 这样就造成渲染的多余成功。
  那如何让上述代码只是渲染孙子节点呢？

解决策略：
 1. React.memo 每次更新的时候会将组件进行一次浅比较
 ```ts
export default React.memo(() => <ConsumerFun />);
 ```
 2. React.useMemo 将组件元素进行缓存起来，每次更新的时候就会跳过该元素的**fiber**
 ```ts
<Context.Provider value={value}>
   {React.useMemo(
          () => (
            <CaseFour />
          ),
          [],
    )}
</Context.Provider>
 ```

 #### display
```ts
const context = React.createContext('');
context.displayName = 'context demo' 
```
这个字段可以在通过 react devtools 查看时显示context的名字

### 高阶用法

#### 多层嵌套
```ts
// provider
 <Context.Provider value={value}>
    <Context1.Provider value={value1}>
        <CaseFive />
    </Context1.Provider>
</Context.Provider>

// consumer
<Context.Consumer>
{(value) => (
    <Context1.Consumer>
    {(value1) => {
        return (
        <div>
            <p>value {value}</p>
            <p>value1 {value1}</p>
        </div>
        );
    }}
    </Context1.Consumer>
)}
</Context.Consumer>
```
 多个Context嵌套使用可以解决很多问题，例如我们可以将不同的插件变量放入不同的context中，避免混用，造成数据混乱

 #### 最后让我用一个完整的例子来结束context的内容
```ts
import React, { useContext, useState } from 'react';

type ContextType = {
  setTheme: Function | null;
  theme: React.CSSProperties | null;
};

const context = React.createContext<ContextType>({
  setTheme: null,
  theme: null,
});

const lightStyle = { color: 'red', borderColor: 'red' };
const blackStyle = { color: 'black', borderColor: 'black' };

const Input: React.FC<ContextType> = (props) => {
  const { theme } = useContext(context);
  return (
    <div>
      <input style={theme!} />
      <input style={props.theme!} />
    </div>
  );
};

const ComsumerInput = () => {
  return <context.Consumer>{(value) => <Input {...value} />}</context.Consumer>;
};

const CheckBox: React.FC = () => {
  const { theme, setTheme } = useContext(context);
  return (
    <div>
      <label style={theme!}>主题切换: </label>
      <input
        type="checkbox"
        onChange={(e) => {
          console.log(e);
          if (e.currentTarget.checked) {
            setTheme!(blackStyle);
          } else {
            setTheme!(lightStyle);
          }
        }}
      />
    </div>
  );
};

class Container extends React.PureComponent {
  render() {
    const { theme } = this.context;
    return (
      <div>
        <CheckBox />
        <ComsumerInput />

        <p style={theme}>当前主题颜色</p>
      </div>
    );
  }
}

Container.contextType = context;

const CaseSix: React.FC = () => {
  const [theme, setTheme] = useState(lightStyle);

  return (
    <context.Provider value={{ theme, setTheme }}>
      <Container />
    </context.Provider>
  );
};

export default CaseSix;
```
总结：
1，总结了context的三种使用模式
2、context的问题总结以及解决策略
3、案例分析

案例代码：https://github.com/ybrelax/react-advanced-practice/tree/master/src/pages/chapter8






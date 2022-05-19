通常来说我们在做性能优化的时候，很重要的一个考量指标是渲染，那么如何去做渲染优化，这就是这篇文章主要所阐述的内容了。

#### react控制渲染的几种方式

##### 1. 通过 **usememo** 来缓存元素,打断更新渲染

```ts
class ChildComponent extends React.Component<{ num: number }> {
  render() {
    console.log('子组件渲染');
    return <div>child content</div>;
  }
}
const Case2: React.FC = () => {
  const [num, setNum] = useState(0);
  const [num1, setNum1] = useState(0);

  return (
    <div>
      <p>{num}</p>
      <p>{num1}</p>
      {useMemo(
        () => (
          <ChildComponent num={num} />
        ),
        [num],
      )}
      <Button onClick={() => setNum(num + 1)}>点击</Button>
      <Button onClick={() => setNum1(num1 + 1)}> 点击1</Button>
    </div>
  );
};

```

只有num发生变更，子组件才会发生渲染

```ts
const result = useMemo(() => Component, [dep])
```
* 第一个参数为一个函数，作为缓存的函数
* 第二个参数（dep), 是响应的依赖
* 返回值是第一个参数（函数）执行的返回值

原理分析：
就是每次其实渲染都会执行 **createElement** 函数，但是在执行的事件，就是在react fiber的更新调和阶段，对比前后的props（这里的props指的是pendingProps指向当前对象的内存地址）, 相同的会就跳过使用缓存元素，不相同则创建新元素

另一种class里的方式也可以看下：
```ts
class Case1 extends React.Component<any, { num: number, num1: number }> {
  childComponent: JSX.Element;
  constructor(props: any) {
    super(props);
    this.state = {
      num: 1,
      num1: 1,
    };
    this.childComponent = <ChildComponent num={this.state.num} />;
  }

  renderChildComponent = () => {
    const { props } = this.childComponent;
    if (props.num === this.state.num) {
      return React.cloneElement(this.childComponent, { num: this.state.num });
    }
    return this.childComponent;
  };

  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <p>{this.state.num1}</p>
        {this.renderChildComponent()}
        <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
          点击
        </Button>
        <Button onClick={() => this.setState({ num1: this.state.num1 + 1 })}>
          {' '}
          点击1
        </Button>
      </div>
    );
  }
}
```
这种方式也可以达到打断更新的效果，但是代码有点不优雅

##### 2. 通过**PureComponent**来进行优化

首先来分析例子：
```ts
class ChildComponent extends React.PureComponent<{ num: number }> {
  state = {
    name: 'ybrelax',
    num: 1,
    obj: {
      num: 1,
    },
  };

  render() {
    console.log('子组件渲染');
    return (
      <div>
        child content
        <Button onClick={() => this.setState({ name: 'ybrelax' })}>
          state 不变更
        </Button>
        <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
          state 变更
        </Button>
        <Button
          onClick={() => {
            this.state.obj.num = this.state.obj.num + 1;
            this.setState({ obj: this.state.obj });
            // this.setState({ obj: { num: this.state.obj.num + 1 } });
          }}
        >
          state 引用类型变更
        </Button>
      </div>
    );
  }
}

class Case3 extends React.Component<any, { num: number; num1: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      num: 1,
      num1: 1,
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <p>{this.state.num1}</p>
        <ChildComponent num={this.state.num} />
        <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
          点击
        </Button>
        <Button onClick={() => this.setState({ num1: this.state.num1 + 1 })}>
          {' '}
          点击1
        </Button>
      </div>
    );
  }
}
```
分析结果：
1. PureComponent 是通过对比state和props与之前的来进行比较进行更新
2. PureComponent 比较的方式是通过浅比较的方式来进行判断
3. 对于如果是引用类型的数据来说，直接重新创建一个变量即可

原理分析：

```ts
pureComponentPrototype.isPureReactComponent = true;
```
首先在**PurComponent**的原型链上有一个属性 isPureReactComponent 来判断是否为纯组件，然后进行组件更新流程; 通过 **updateClassInstance** 这个生命周期然后在里面有一个叫**checkShouldComponentUpdate** 的函数来做具体判断

```ts
function checkShouldComponentUpdate(){
     if (typeof instance.shouldComponentUpdate === 'function') {
         return instance.shouldComponentUpdate(newProps,newState,nextContext)  /* shouldComponentUpdate 逻辑 */
     } 
    if (ctor.prototype && ctor.prototype.isPureReactComponent) {
        return  !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    }
}
// react/react-reconciler/ReactFiberClassComponent.js
```
从上面的函数可以看出：
* shouldComponentUpdate 的权重会高一点
* 然后在进行纯组件的比较

**shallowEqual** 这个函数是主要的比较流程
* 首先会直接比较 新老state或者新老props 是否相等
* 通过 --Object.key-- 遍历新老state或者新老props，通过比较长度，来看是否有增加字段
* 遍历新老state或者新老props 每个字段去比较（这里只做浅比较）

注意事项：

1. 不要在渲染的时候用函数处理

```ts
  render() {
    const Child = () => <ChildComponent num={this.state.num} />;
    return (
      <div>
        <p>{this.state.num}</p>
        <p>{this.state.num1}</p>
        <Child />
        <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
          点击
        </Button>
        <Button onClick={() => this.setState({ num1: this.state.num1 + 1 })}>
          点击1
        </Button>
      </div>
    );
  }
```
这样处理的的话，每次都等于生成一个新的函数，PureComponent的意义就失去了。

2. 组件函数的传递
```ts
 const [num, setNum] = useState(0);
  const handleClick = () => {};

  return (
    <div>
      <ChildComponent handleClick={handleClick} />
      <div>{num}</div>
      <Button onClick={() => setNum(num + 1)}>点击</Button>
    </div>
  );
```
从上面的例子可以知道，每次渲染**handleClick**都会重新创建，那么PureComponent也会更新；
处理方案：

```ts
  const handleClickMemo = useCallback(handleClick, []);
```

3. useMemo和useCallBack的区别

* 共同点，两者都是用来做缓存处理的
* useMemo 是用来缓存值的，也就是一个参数是需要执行的，缓存第一个的结果
* useCallback 是用来缓存内容的，第一个参数不需要执行

##### 3 通过 shouldComponentUpdate 来进行优化

```ts
shouldComponentUpdate(preProps, preState) {}

```
* preProps: 代表之前的props
* preState: 代表之前的state
函数的返回值为ture 代表更新， 函数的返回值为fase 代表不更新

通常在进行基本属性对比的时候，直接进行 === 就可以了，但是对于引用类型来说，其实比的是所指向的内存地址，在修改一些引用类型的属性的时候并不会改变志向的问题

```ts
const numObj = Immutable.Map(this.state.numObj);
  this.setState({
    numObj: numObj.set('value', Math.random()).toJS(),
  });
```
Immutable: 这个包在维持原对象基本的情况，最小进行了改变（结构上很大程度共享了，避免了像深度遍历这种过度操作，浪费空间），每次都会返回一个新的实例

##### 4 React.memo

```ts
const TestDemo: React.FC<{ num?: number }> = (props) => {
  console.log('更新了');
  return <div>num: {props.num}</div>;
};

const MemoTestDemo = React.memo(TestDemo, (pre, cur) => {
  console.log(pre, cur);
  if (pre.num === cur.num) {
      return true;
  }
  return false;
});

class Case6 extends React.Component {
  state = {
    num: 1,
    num2: 1
  };

  render() {
    return (
      <div>
        <p>num2: {this.state.num2}</p>
        <MemoTestDemo num={this.state.num} />
        <Button onClick={() => this.setState({ num: this.state.num + 1 })}>
          click
        </Button>
        <Button onClick={() => this.setState({ num2: this.state.num2 + 1 })}>
          click2
        </Button>
      </div>
    );
  }
}
```

** React.memo(component, compare) ** 

React.memo 可以用来缓存元素，控制组件跟新，可以用于Class和Fuction组件
component: 指定更新的组件
coompare: 对比的条件（可选参数，函数类型），函数的参数：之前的props和更新后的props, 与shouldComponentUpdate 相反，为true的时候不更新，为false的时候更新；当该参数不传的时候，就进行浅比较（props进行浅比较）

memo 中的内部更新逻辑主要由*updateMemoComponent* 来实现 

```ts
function updateMemoComponent(){
    if (updateExpirationTime < renderExpirationTime) {
         let compare = Component.compare;
         compare = compare !== null ? compare : shallowEqual //如果 memo 有第二个参数，则用二个参数判定，没有则浅比较props是否相等。
        if (compare(prevProps, nextProps) && current.ref === workInProgress.ref) {
            return bailoutOnAlreadyFinishedWork(current,workInProgress,renderExpirationTime); //已经完成工作停止向下调和节点。
        }
    }
    // 返回将要更新组件,memo包装的组件对应的fiber，继续向下调和更新。
}
```
主要流程
*  当compare条件返回true的时候, 当前fiber完成工作，停止向下调和，组件不更新
*  memo的机制类似高阶组件，通过判断返回值，来确定是否进行更新


##### 5 打破更新流程

1. 通过传递ref，来打破跟新流程
```ts
<MemoTestDemo
  ref={{
    num: this.state.num,
  }}
  num={this.state.num}
/>
```

2. forceUpdate
在*class*组件中，forceUpdate 会打断shuoldUpdate和PureComponent的浅比较过程，进行直接更新
```ts
 <Button onClick={() => {
  this.forceUpdate()
  // this.setState({ num2: this.state.num2 + 1 })
}}>
  click2
</Button>
```

3. context 穿透
context可以跨组件进行传递，所以在context中有数据进行更新的时候，响应的组件也会进行更新


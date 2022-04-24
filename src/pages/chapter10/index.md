在日常使用中，高阶函数用的很多，但是如何去具体去用，以及如何优雅的处理，这个确实需要去整理清晰才行

#### 两种高阶组件的方式

1. 正向代理

```ts
const HOC = (WrapComponent: React.FC<CaseType>) => {
  const text = 'this is hoc message';
  return class AdvanceComponent extends React.Component {
    render() {
      return <WrapComponent {...this.props} hocText={text} />;
    }
  };
};

const Case1: React.FC<CaseType> = (props) => {
  return (
    <div>
      正向代理(props text): {props.text}
      正向代理(hoc text): {props.hocText}
    </div>
  );
};

export default HOC(Case1);
```
从上面的代码我们可以分析出正向代理的几个特性
* 嵌套组件，然后再将props进行转发，同时附带自己的属性（强化了props的传参
* 本质上是生成一个新组件，所以不能进行ref代理，需要进行转发
* 不能对原有组件进行操作，所以理论上来说隔离了污染，但是也缺少了一些控制的缺陷

2. 属性代理（反响代理）

```ts
interface CaseType {
  isAuth?: boolean;
  text?: string;
  hocText?: string;
}

const HOC = (WrapComponent: React.FC<CaseType>) => {
  const text = 'this is hoc message';
  // one
  return class AdvanceComponent extends React.Component<CaseType> {
    
    render() {
      const { isAuth } = this.props;
      return isAuth ? (
        <div>
          <WrapComponent {...this.props} hocText={text} />
        </div>
      ) : (
        <div>没有权限，无权访问</div>
      );
    }
  };
  // two
  const AdvanceComponent = () => {
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = () => console.log('you click hear');
    domRef.current?.addEventListener('click', handleClick);
    return () => domRef.current?.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={domRef}>
      <WrapComponent hocText="text" />
    </div>
  );
  };
  return AdvanceComponent;
};

const Case2: React.FC<CaseType> = (props) => {
  return (
    <div>
      属性代理(props text): {props.text}
      属性代理(hoc text): {props.hocText}
    </div>
  );
};
```
从上面的例子可以看出：
* 和方向代理有点类似，但是能对子组件进行控制
* 对子组件的事件进行监听
* 可以获取子组件的实例

3. 总结
* 可以通过高阶组件对props进行增减
* 可以通过api进行显示控制
* 可以对子组件的事件进行控制处理
* 也可以转发，控制子组件的ref (操作dom属性...)

#### 问题分析
1. 属性劫持，导致作用域混乱

```ts
const HOC = (component: React.ComponentClass<{ text: string }>) => {
  const preComponentDidMount = component.prototype.componentDidMount;
  component.prototype.componentDidMount = function () {
    console.log('劫持 生命周期 HOC', this.props);
    preComponentDidMount.call({ props: { text: 3444 } });
  };
  return component as unknown as typeof Content;
};

@HOC
class Content extends React.Component<{ text: string }> {
  componentDidMount() {
    console.log('case4 componentDidMount:', this);
  }

  render() {
    return <div>case4</div>;
  }
}

const HOC1 = (component: React.ComponentClass<{ text: string }>) => {
  const num = 10;

  const preComponentDidMount = component.prototype.componentDidMount;
  component.prototype.componentDidMount = () => {
    console.log('劫持 生命周期 HOC1', this);
    preComponentDidMount.call({ props: { text: 222 } });
  };

  return component as unknown as typeof Content;
};

const Content1 = HOC1(Content);

const Case4: React.FC = () => {
  return (
    <div>
      <Content1 text={'this is case4 message'} />
    </div>
  );
};

// 输出
劫持 生命周期 HOC1 undefined
case4.tsx:6 劫持 生命周期 HOC {text: 222}
case4.tsx:15 case4 componentDidMount: {props: {…}}
```
从上面的结果可以看出，作用域多次更改后，导致最终作用域发生了混乱，所以对于修改原型链的这种作用域，需要谨慎使用

2. 组件渲染


```ts
const Case5: React.FC = () => {
  const HocContent = HOC(Content);
  return (
    <div>
      <HocContent text={'this is case5 message'} />
    </div>
  );
};

class Case5 extends React.Component {
  render() {
    const HocContent = HOC(Content);
    return <div>
        <HocContent text={'this is case5 message'} />
    </div>;
  }
}

```
这样写存在的缺陷在于，每次更新渲染都会重新生成组件，造成开销浪费


3. 多个hoc，顺序问题

```ts
const HOC = (
  WrapComponent: React.FC<CaseType> | React.ComponentClass<CaseType>,
) => {
  return class AdvanceComponent extends React.Component<CaseType> {
    render() {
      return <div>hoc: <WrapComponent {...this.props} /></div>;
    }
  };
};

const HOC1 = (
  WrapComponent: React.FC<CaseType> | React.ComponentClass<CaseType>,
) => {
  return class AdvanceComponent extends React.Component<CaseType> {
    render() {
      return <div>hoc1: <WrapComponent {...this.props} /></div>;
    }
  };
};

@HOC1
@HOC
class Content extends React.Component<CaseType> {
  render() {
    return <div>content: {this.props.text}</div>;
  }
}


class Case6 extends React.Component {
  render() {
 ;
    return <div>
        <Content text={'this is case6 message'} />
    </div>;
  }
}
```

当前组件的掉用顺序其实相当于 -HOC1(HOC(Content))- 这样写是不是就很好理解了
依次调用的顺序 HOC1 -> HOC -> Content

4. 静态属性

从hoc的特性可得知，其本质上来说是生成一个新的组件，所以在hoc包裹后，所以需要再做下处理

```ts
import hoistNonReactStatic from 'hoist-non-react-statics';

const HOC = (WrapComponent: React.FC<CaseType>) => {

  class AdvanceComponent extends React.Component<CaseType> {
  ...
  }
  1. hoistNonReactStatic(AdvanceComponent, WrapComponent)
  2. AdvanceComponent.staticTestName = WrapComponent.staticTestName;
  return AdvanceComponent;
};
```

方案一：
手动继承： AdvanceComponent.staticTestName = WrapComponent.staticTestName;
方案二：
插件：hoist-non-react-statics
hoistNonReactStatic(AdvanceComponent, WrapComponent)

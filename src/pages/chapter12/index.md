
### 渲染调优

#### 1. 异步组件的渲染

**Suspense** : 
在React中可以用它来做一个异步渲染；通常来说渲染的机制都是同步发生的，（即通过 setState, useSetxxx, 请求了数据，然后在渲染)；Suspense就可以很好解决这个问题；当然它并使解决了，应该是巧妙的绕过去了；

```ts
 <Suspense fallback={<div>loading </div>}>
        <Component />
 </Suspense>
 ```

* fallback: 在异步组件还未加载出来的时候，执行的函数

原理：
Suspense 通过*try/catch*来捕获异常，这里值得注意的是，这个异常通常是一个Promise；Suspense本身会执行这个Promise,然后再把它渲染出来。

**React.lazy**:
React中提供了**lazy**来做异步加载组件处理
```ts
const AsyncComponent = (Component, api) => {
  const AsyncComponentPromise = () => new Promise(async (resolve) => {
    const res = await api();
    console.log('result:', res);
    resolve({
      default: (props) => <Component {...props} {...res} />,
    });
  });
  return React.lazy(AsyncComponentPromise);
};
```
原理分析：
```ts
react/src/ReactLazy.js
```

```ts
function lazy(ctor){
    return {
         $$typeof: REACT_LAZY_TYPE,
         _payload:{
            _status: -1,  //初始化状态
            _result: ctor,
         },
         _init:function(payload){
             if(payload._status===-1){ /* 第一次执行会走这里  */
                const ctor = payload._result;
                const thenable = ctor();
                payload._status = Pending;
                payload._result = thenable;
                thenable.then((moduleObject)=>{
                    const defaultExport = moduleObject.default;
                    resolved._status = Resolved; // 1 成功状态
                    resolved._result = defaultExport;/* defaultExport 为我们动态加载的组件本身  */ 
                })
             }
            if(payload._status === Resolved){ // 成功状态
                return payload._result;
            }
            else {  //第一次会抛出Promise异常给Suspense
                throw payload._result; 
            }
         }
    }
}
```

原理分析：
React.lazy 会被标记为**REACT_LAZY_TYPE**元素，在渲染调和的时候就会变成**REACT_LAZY_TYPE** 的fiber类型；

1. 第一步；
第一次渲染的时候，执行init方法，然后其结果被当前实例接收（defaultExport), 然后执行到第二个if条件的时候，状态并没有为Resolved状态，所以直接走else抛出异常
2. 第二步;
Suspense捕获异常，然后并执行Promsise,然后发生第二次渲染，此时的**status**已经变为了Resolved, 渲染其结果

![React.lazy](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6792d24862464d89b2034bfa4cf9e5a8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

### 3. 错误边界渲染

* componentDidCatch
接收两个参数
1. info 错误信息
2. stack 包含组件错误信息的栈信息

```ts
const Test: React.FC = () => {
  return;
};

class Case2 extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(...arg: any[]) {
    console.log('info:', arg);
    this.setState({
      hasError: true,
    });
  }

  render() {
    return (
      <div>
        23
        {this.state.hasError ? <Test /> : 'error'}
      </div>
    );
  }
}
```

* getDerivedStateFromError
React更加希望用此来代替**ComponentDidCatch**；接收的参数和它类似

```ts
class Case2 extends React.Component {
  state = {
    hasError: false,
  };

 static getDerivedStateFromError(...arg: any[]) {
    console.log('info:', arg);
    return {
        hasError: true
    }
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
```
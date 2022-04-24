深入理解ref

### 简介
ref是react中比较基本的特征，在我们日常开发中也经常使用，现在让我们来了解下**ref**

### ref的三种使用方式
1. class 方式

```ts
  private node: null | unknown = null;

  componentDidMount() {
    console.log('node', this.node);
  }

  render() {
    return <NewFather ref={(node) => (this.node = node)} />;
  }
```

2. 函数方式

```ts
 const ref = useRef();

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return (
    <div>
      <NewIndex ref={ref} />
    </div>
  );
```

3. 字符变量

```ts
  private node: null | unknown = null;
  private node1: null | unknown = null;

  componentDidMount() {
    console.log('node', this.node);
    console.log('node1:', this.refs)
  }

  render() {
    return <>
    <NewFather ref={(node) => (this.node = node)} />
    <div ref = "node1">123</div>
    </>;
  }
```
 这种方式在以后的版本中可能被废弃
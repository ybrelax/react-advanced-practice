模块化CSS

### 简介
随着项目越来越大，以及开发的人员越来越多，就会出现css重名的情况，如果权重不够的话，很可能就会出现css不起作用。如果写过vue的人一定知道每个单文件都可以**scoped**将作用域隔离开来。那React🈶️没有这种技巧呢？就让我们来研究一下；

### cssModule
这种能将css对立成一个对立的模块，其实原理就是把对象的className加上独立的module编码

#### 1. webpack配置
```ts
{
    loader: "css-loader",
    options: {
        importLoaders: 1,
        modules: {
        localIdentName: "[local]__[hash:base64:5]",
        },
    },
},
```
#### 2. 使用
```ts
// css
.text {
    color: blue
}

// js
 <p className = {styles.text}>道格拉斯牛逼</p>
  ```
得到
```ts
<p class="text___3i_VO">道格拉斯牛逼</p>
```
可以看到在原本的类后面加上了 *___3i_VO* 的module编码，防止css全局污染

#### 3. 全局变量
在我们日常使用的css module的情况，很容易会出现修改一些全局的css变量，但是通过了css module之后就等于css变量的命名都发生了改变。这时候就需要用到全局变量

```css
.text {
  color: blue;
}

:local(.text) {
  color: red;
}

:global(.text) {
    color: yellow
}
```

上面的例子可以进行一一分析
* .text => 变量名会被模块化
* :local(.text) => 等价于.text 也会被css模块化
* :global(.text) => 变量名不会被模块会，编译之后显示的命名为**text**

#### 4. 组合样式

```css
.baseText {
  color: palegreen;
}
.text3 {
  composes: baseText;
  background: burlywood;
}

.text4 {
  composes: baseText from "./index1.css";
  background: lightcyan; 
}
```
得到的结果：
```html
<p className = {styles.text3}>测试文字第三段</p>
<p className = {styles.text4}>测试文字第四段</p>

<!-- 转化后得到以下的内容 -->

<p class="text3___sLj1F baseText___1UBPK">测试文字第三段</p>
<p class="text4___2iOrB baseText___kiEka">测试文字第三段</p>

```
结论：我们可以通过**composes**关键字去组合样式

#### 5. 动态渲染

```ts
import classNames from 'classnames';
<p
className={classNames({
    [styles.text3]: true,
    [styles.text4]: false,
})}
>
  测试文字第五段
</p>
```
上面的案例最终渲染只会得到 text3 ；
所以我们可以通过**classnames**这个包来动态解析

### Css In Js

这个怎么理解呢？通俗来将就是在js中写css样式。

#### 1.使用

```ts
import styleJs from './style';
<p style={styleJs.text6Style}>测试文字第六段</p>

// js
const text6Style = {
    color: 'red',
    background: 'black'
}

export default {
    text6Style
}
```
所以，是不是一目了然，知道怎么用了吧。

#### 2.styled-components

这是一个很有意义的包，能很好的解决css隔离作用, 防止css滥用的情况

案例1. 条件判断
```ts
const Text7 = styled.p<{
  textBg: string;
}>({
  color: 'blue',
  background: ((props: { textBg: any }) =>
    props.textBg || 'yellow') as unknown as Property.Background,
});

// html
 <Text7 textBg={'green'}>测试文字第七段</Text7>
 ```

 案例2. 样式继承
```ts
const Text = styled.p`
  color: red;
`;

const Text7 = styled(Text)<{
  textBg: string;
}>({
  background: ((props: { textBg: any }) =>
    props.textBg || 'yellow') as unknown as Property.Background,
});
```

 从上面我们可以看到完成了一下几个功能点
 1. 运用js插入了一套css代码
 2. 重新生成了一个组件
 3. 加入了条件判断，可以通过向组件穿参来控制显示
 4. 样式可以通过继承得来

 更多好玩的功能可以查看 https://styled-components.com/docs/advanced

 

import React from 'react';

interface IProps {
  component: React.FC<{ value: number }>;
  data: number[];
  onScroll?: (e: Event) => void;
  onScrollTolower?: () => void;
}

interface IState {
  dataSource: number[];
}

class ScrollView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  private nodeRef = null as HTMLDivElement | null;

  private handleScroll(arg: Event) {
    this.props.onScroll && this.props.onScroll(arg);
    this.handleScrollTolower();
  }

  private handleScrollTolower() {
    const { onScrollTolower } = this.props;
    if (this.nodeRef) {
      const { scrollHeight, scrollTop, offsetHeight } = this.nodeRef;
      console.log(scrollTop, offsetHeight, scrollHeight);
      if (scrollHeight === scrollTop + offsetHeight) {
        onScrollTolower && onScrollTolower();
      }
    }
  }

  static getDerivedStateFromProps(preProps: IProps) {
    const { data } = preProps;
    return {
      dataSource: data || [],
    };
  }

  // 优化性能 (外部数据变动才去改变)
  shouldComponentUpdate(_: IProps, newState: IState) {
    return newState.dataSource !== this.state.dataSource;
  }

  // 绑定事件监听
  componentDidMount() {
    this.nodeRef && this.nodeRef.addEventListener('scroll', this.handleScroll.bind(this));
  }

  //  获取更新前的快照
  getSnapshotBeforeUpdate() {
    return this.nodeRef?.scrollHeight;
  }

  // 更新后获得容器高度
  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: number) {
    if (this.nodeRef)
      console.log(
        'scrollView 高度容器变化',
        this.nodeRef?.scrollHeight - snapshot,
      );
  }

  // 解绑事件监听
  componentWillUnmount() {
    this.nodeRef &&
      this.nodeRef.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { component } = this.props;
    const { dataSource } = this.state;
    return (
      <div
        ref={(e) => (this.nodeRef = e)}
        style={{ height: '800px', overflow: 'auto' }}
      >
        <div>
          {dataSource.map(
            (value) =>
              React.createElement(component, {
                value,
                key: value,
              }), //渲染 Item 列表内容。
          )}
        </div>
      </div>
    );
  }
}

export default ScrollView;

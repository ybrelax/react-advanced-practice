import React from 'react';

const Children = (props: any) => (
  <div>
    <div>hello, my name is {props.name} </div>
    <div> {props.mes} </div>
  </div>
);

function Container(props: any) {
  const ContainerProps = {
    name: 'alien',
    mes: 'let us learn react',
  };
  return props.children.map((item: any) => {
    if (React.isValidElement(item)) {
      // 判断是 react elment  混入 props
      return React.cloneElement(
        item,
        { ...ContainerProps },
        item.props.children,
      );
    } else if (typeof item === 'function') {
      return item(ContainerProps);
    } else return null;
  });
}

const Index = () => {
  return (
    <Container>
      <Children key="child" />
      {(ContainerProps: any) => <Children {...ContainerProps} name={'haha'} />}
    </Container>
  );
};

export default Index;

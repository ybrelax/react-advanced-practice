import React, { useEffect, useRef } from 'react';

interface CaseType {
  isAuth?: boolean;
  text?: string;
  hocText?: string;
}

const HOC = (WrapComponent: React.ComponentClass<CaseType>): any => {
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

// @HOC
// const Case3: React.FC<CaseType> = (props) => {
//   return (
//     <div >
//       属性代理(props text): {props.text}
//       属性代理(hoc text): {props.hocText}
//     </div>
//   );
// };
// export default HOC(Case3) as unknown as React.FC<CaseType>;

@HOC
class Case3 extends React.Component<CaseType> {
  render() {
    return (
      <div>
        属性代理(props text): {this.props.text}
        属性代理(hoc text): {this.props.hocText}
      </div>
    );
  }
}

export default Case3;

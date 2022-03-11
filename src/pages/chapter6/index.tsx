import React, { useEffect, useState } from 'react';
import ScrollView from './components/ScrollView';

const Item: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div
      style={{
        height: '100px',
        // background: `rgb(255,${Math.floor(Math.random() * 255)},${Math.floor(
        //   Math.random() * 255,
        // )})`,
      }}
    >
      {value}
    </div>
  );
};

const CharterSix: React.FC = () => {
  const [dataSource, setDataSource] = useState<number[]>([]);

  const getData = () => {
    const specifyArr = new Array(20).fill('').map(() => Math.random() * 100);
    setDataSource(specifyArr);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      data={dataSource}
      component={Item}
      onScrollTolower={() => console.log('到底了')}
    />
  );
};

export default CharterSix;

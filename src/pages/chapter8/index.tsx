import React, { useState } from 'react';
import Context from './context';
import Context1 from './context1';
import CaseOne from './cases/one';
import CaseTwo from './cases/two';
import CaseThree from './cases/three';
import CaseFour from './cases/four';
import CaseFive from './cases/five';
import CaseSix from "./cases/six"
import { Input } from 'antd';

const ContextDemo: React.FC = () => {
  const [value, setValue] = useState('value');
  const [value1, setValue1] = useState('value1');

  return (
    <div>
      {/* <Context.Provider value={value}>
        <CaseOne />
      </Context.Provider>
      <Context.Provider value={value}>
        <CaseTwo />
      </Context.Provider>
      <Context.Provider value={value}>
        <CaseThree />
      </Context.Provider>
      <Context.Provider value={value}>
        {React.useMemo(
          () => (
            <CaseFour />
          ),
          [],
        )}
      </Context.Provider> */}
      {/* <Context.Provider value={value}>
        <Context1.Provider value={value1}>
          <CaseFive />
        </Context1.Provider>
      </Context.Provider>
      <Input
        placeholder="改变value"
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Input
        placeholder="改变value1"
        onChange={(e) => setValue1(e.currentTarget.value)}
      /> */}
      <CaseSix />
    </div>
  );
};

export default ContextDemo;


import React from 'react';
import '../Components.css';
import Counter from '../components/Counter/Counter';  
import Timer from '../components/Timer/Timer';  
import Temperatures from '../components/Temperatures/Temperatures';  
import Add from '../components/add/Add';

function Component() {
  return (
    <div className="background-container">
      <div className="component-container">
        <h1 className="title_work">React Components</h1>
        <div className="lineOf_CAT">
          <div className="counter-timer">
            <Counter name={""} value={0} />
            <Timer />
          </div>
          <div className="forAdd">
            <Add aValue={0} bValue={0} />
          </div>
        </div>
        <Temperatures />
        <h3 className="title-myname">นายจารุกิตติ์ โลบไธสง รหัส 66053541</h3>
      </div>
    </div>
  );
}

export default Component;
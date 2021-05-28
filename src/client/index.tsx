import React from 'react';
import ReactDOM from 'react-dom';
import { IndicatorTable } from './src';

const HelloWorld = () => {
  return (
    <div>
      <IndicatorTable/>
    </div>
  );
}

ReactDOM.render(<HelloWorld />, document.getElementById("root"));
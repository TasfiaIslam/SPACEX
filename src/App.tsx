import React from 'react';
import './App.css';
import Launches from './features/launches/Launches';

const App = (): JSX.Element => {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Launches />
      </header> */}
      <Launches />
    </div>
  );
};

export default App;

import React from 'react';
import gif from './20cat.gif';
import './App.css';
import Tabs from "./Components/TabComponent/Tabs";
import CircleButton from "./Components/TaskVisComponents/accounticon"; 

// For the cat  <img src={gif} className="App-logo" alt="gif" />


function App() {
  return (
    <div className="App">
      <header className="App-header"> 
        <CircleButton />
        <img src={gif} className="App-logo" alt="gif" />
      </header>

      <Tabs />
    </div>
  );
}

export default App;

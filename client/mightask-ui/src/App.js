import React from 'react';
import ReactDom from 'react-dom';
//import gif from './20cat.gif';
import './App.css';
import Tabs from "./Components/TabComponent/Tabs";
import listscroller from "./Components/TaskVisComponents/listscroller";

// For the cat  <img src={gif} className="App-logo" alt="gif" />


function App() {
  return (
    <div className="App">
      <header className="App-header"> 
      </header>

      <Tabs />
      <listscroller />
    </div>
  );
}

export default App;

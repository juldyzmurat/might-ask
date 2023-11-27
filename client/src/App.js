import React from "react";
import "./App.css";
import TaskView from "./Components/Pages/TasksViewPage";
import Navbar from "./Components/NavBar/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/";
import About from "./Components/Pages/about";
import Schedule from "./Components/Pages/schedule";
import Dashboard from "./Components/Pages/DashboardPage";

// For the cat  <img src={gif} className="App-logo" alt="gif" />

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/TasksViewPage" element={<TaskView />} />
          <Route path="/DashboardPage" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";

import "./App.css";
import TaskViews from "./Components/Pages/TaskViews";
import Navbar from "./Components/NavBar/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/";
import About from "./Components/Pages/about";
import Schedule from "./Components/Pages/schedule";
import Dashboard from "./Components/Pages/DashboardPage";
import CatStats from "./Components/Pages/catstats";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Navbar />
        {/* <div className="main-box"> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/task-views" element={<TaskViews />} />
            <Route path="/DashboardPage" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/catstats" element={<CatStats />} />
          </Routes>
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;

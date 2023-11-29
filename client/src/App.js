import React from "react";
import "./App.css";
import TaskViews from "./Components/Pages/TaskViews";
import Navbar from "./Components/NavBar/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/";
import About from "./Components/Pages/about";
import Schedule from "./Components/Pages/schedule";
import Dashboard from "./Components/Pages/DashboardPage";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Navbar />
        <div classname="main-box"style={{
  background: "#f1b6dc",
  margin: "3.5rem auto 1.5rem",
  padding: "2rem 1rem",
  color: "#e8f0f2",
  borderRadius: "2rem",
  paddingTop: "5%"
}}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/task-views" element={<TaskViews />} />
            <Route path="/DashboardPage" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import gif from './20cat.gif';
import './App.css';
import CircleButton from "./Components/TaskVisComponents/accounticon"; 
import TaskView from './Components/Pages/TasksViewPage';
import Navbar from './Components/NavBar/';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './Components/Pages/';
import About from './Components/Pages/about';
import Blogs from './Components/Pages/blogs';
import SignUp from './Components/Pages/signup';
import Contact from './Components/Pages/contact';
import Google from "./Components/Login/LoginAPI";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from "./Components/Pages/DashboardPage";


// For the cat  <img src={gif} className="App-logo" alt="gif" />


function App() {


  return (
    <div className="App">
      <header className="App-header"> 
    
      <CircleButton />
        <img src={gif} className="App-logo" alt="gif" />
      </header>
        <Router>
            <Navbar />
            
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/TasksViewPage' element={<TaskView />} />
                <Route path='/DashboardPage' element={<Dashboard />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;



// For the cat  <img src={gif} className="App-logo" alt="gif" />



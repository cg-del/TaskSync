import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Notes from './Components_V2/StickyNotes';
import Task from './Components_V2/Task';
import Calendar from './Components_V2/Calendar';

import Timer from './components/Timer'; 
import Home from './components/Home'; 
import Login from './components/Login'; 
import Signup from './components/Signup';
import { UserProvider } from './UserContext'; 

function App() {
  return (
    <UserProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/timers" element={<Timer />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
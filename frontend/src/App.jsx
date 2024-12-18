import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Landing from './components/Landing';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Notes from './components/StickyNotes';
import Task from './components/Task';
import Calendar from './components/TaskCalendar';
import NotFound from './components/404';
import Profile from './components/profile';

import Timer from './components/Timer';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/timers" element={<Timer />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
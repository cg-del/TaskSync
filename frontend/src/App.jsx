import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Landing from './Components_V2/Landing';
import Loginv2 from './Components_V2/Login';
import Signupv2 from './Components_V2/Signup';
import Notes from './Components_V2/StickyNotes';
import Task from './Components_V2/Task';
import Calendar from './Components_V2/TaskCalendar';



import Home from './components/Home';

import Timer from './components/Timer';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider> 
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          
          <Route path="/" element={<Landing />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/timers" element={<Timer />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Loginv2" element={<Loginv2 />} />
          <Route path="/Signupv2" element={<Signupv2 />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
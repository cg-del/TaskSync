import React, { useState } from 'react';
//import SlotsSignIn from './Components/Sign-in';
//import CustomSignUp from './Components/Sign-up';
import DashboardLayoutNoMiniSidebar from './Components/Landing';

export default function AuthContainer() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleAuth = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div>
      <DashboardLayoutNoMiniSidebar/>
      {/* {isSignIn ? (
        <SlotsSignIn toggleAuth={toggleAuth} />
      ) : (
        <CustomSignUp toggleAuth={toggleAuth} />
      )} */}
    </div>
  );
}
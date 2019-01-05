import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {

  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('SignOut')} >Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('SignIn')} >Sign In</p>
        <p onClick={() => onRouteChange('Register')} >Register</p>
      </nav>
    );
  }
}

export default Navigation;
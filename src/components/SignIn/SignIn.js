import React from "react";

const SignIn = ({ signInEmailChange }) => {
  return (
    <div>
      <input onChange={signInEmailChange} />
    </div>
  );
};

export default SignIn;

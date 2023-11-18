import React from "react";
import SignupComponent from "../components/Singup";

import { AuthProvider } from "../Contexts/AuthContext";

const Signup = () => {
  return (
    <AuthProvider>
    <div className="container">

      <SignupComponent/>

    </div>
    </AuthProvider>
  );
};

export default Signup;
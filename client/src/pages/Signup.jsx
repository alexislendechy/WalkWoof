import React from "react";
import SignupComponent from "../components/Signup/index.jsx";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AuthProvider } from "../Contexts/AuthContext";

const Signup = () => {
  return (
    <AuthProvider>
      <div className="container">
        <SignupComponent />
      </div>
    </AuthProvider>
  );
};

export default Signup;

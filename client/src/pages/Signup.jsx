import SignupComponent from "../components/Singup";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AuthProvider } from "../Contexts/AuthContext";

const Signup = () => {
  return (
    <AuthProvider>
    <div className="container">
      <Nav/>
      <SignupComponent/>
      <Footer/>
    </div>
    </AuthProvider>
  );
};

export default Signup;

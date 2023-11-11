import SignupComponent from "../components/Singup";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Signup = () => {
  return (
    <div className="container">
      <Nav/>
      <SignupComponent/>
      <Footer/>
    </div>
  );
};

export default Signup;

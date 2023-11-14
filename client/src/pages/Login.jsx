import LoginComponent from "../components/Login";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <div className="container">
      <Nav/>
      <LoginComponent/>
      <Footer/>
    </div>
  );
};

export default Login;

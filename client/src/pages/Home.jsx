import Nav from "../components/Nav";
import Header from "../components/Header";
import Map from "../components/MapComponent";
import Footer from "../components/Footer";
import { AuthProvider } from "../Contexts/AuthContext";

//El home default tendrá Navbar, Header con imagen background, showcase de perfiles de paseadores, search bar, contact info/footer?

const Home = () => {
  return (
    <div className="container">
      <AuthProvider><Dashboard></Dashboard></AuthProvider>
      <Nav />
      <Header />
      <Map />
      <Footer />
    </div>
  );
};

export default Home;

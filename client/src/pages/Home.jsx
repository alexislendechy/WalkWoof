import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
//El home default tendrá Navbar, Header con imagen background, showcase de perfiles de paseadores, search bar, contact info/footer.

const Home = () => {
  return (
    <div className="container">
      <Map />
      <WalkerList />
      <Appointments />
    </div>
  );
};

export default Home;

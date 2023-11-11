import Cart from "../components/Cart";
import WalkersList from "../components/WalkersList";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const SearchResults = () => {
  return (
    <div className="container">
      <SearchBar/>
      <Nav/>
      <WalkersList />
      <Cart />
      <Footer/>
    </div>
  );
};

export default SearchResults;

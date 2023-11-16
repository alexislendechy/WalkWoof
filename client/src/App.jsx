import React from "react";
import MapComponent from "./components/MapComponent";
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';



const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <div>

      <h1>Dog Walking App</h1>
      <Nav />
      < Header/>

      <MapComponent />
      <Footer />
      
    </div>
  );
};

export default App;



import React from "react";
import MapComponent from "./components/MapComponent";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
//import Nav from './components/Nav/Index';
//import Header from './components/Header';

//const authLink = setContext((_, { headers }) => {
// const token = localStorage.getItem('id_token');
//return {
// headers: {
//  ...headers,
//  authorization: token ? `Bearer ${token}` : '',
// },
// };
//});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <div>
      <h1>Dog Walking App</h1>

      <MapComponent />
    </div>
  );
};

export default App;

import React from "react";
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Nav from './components/Nav';
import Footer from './components/Footer';




const httpLink = createHttpLink({
  uri: '/graphql',
});


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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1 0 auto;
`;

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Nav/>
        <Content>
          <Outlet />
        </Content>
        <Footer/>
      </Layout>
    </ApolloProvider>
  );
};

export default App;


import React from 'react';
import {createRoot} from 'react-dom/client';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from './components/App.js';
import LoginForm from './components/LoginForm.js';
import SignupForm from './components/SignupForm.js';
import Dashboard from './components/Dashboard.js';
import RequireAuth from './components/requireAuth.js';

const httpLink = createHttpLink({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin'
    }
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
        <Router>
            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="login" element={<LoginForm/>}></Route>
                <Route path="signup" element={<SignupForm/>}></Route>
                <Route path="dashboard" element={<RequireAuth><Dashboard/></RequireAuth>}></Route>
            </Routes>
        </Router>
    </ApolloProvider>
  );
};

createRoot(document.getElementById("root")).render(<Root />);

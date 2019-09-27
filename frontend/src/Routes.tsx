import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// components
import App from './components/App';
import PokemonDetails from "./components/PokemonDetails";

//apollo client setup
const client = new ApolloClient({
   uri: "http://localhost:4000/graphql"
})



function AppRouter() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/:name" component={PokemonDetails} />
                </Switch>
            </Router>
        </ApolloProvider>
    );
  }
  
  export default AppRouter;
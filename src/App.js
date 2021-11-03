import React, { Component, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import {onError} from "@apollo/client/link/error"
import { from } from 'apollo-link'

import logo from "./acre-logo.svg";
import "./App.css";

import GetUsers from "./components/GetUsers";



const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors){
    graphqlErrors.map(({message, location, path}) =>{
      alert(`graphql error ${message}`)
    })
  }
})

const uri = "http://localhost:4000/"

const link = from([
  errorLink, 
  new HttpLink(uri)
])

const client = new ApolloClient({
  cache:InMemoryCache, 
  link:link
})


// const { loading, error, data } = useQuery(LOAD_USERS);

// useEffect(() => {
//   console.log(data)
// }, [data])


// function GetUsers() {
//   const { loading, error, data } = useQuery(LOAD_USERS);

//   if (loading) console.log('Loading...');
//   if (error) console.log(`Error! ${error.message}`);

//   console.log(data)
// }



class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />

          <h1>Welcome to acre</h1>
          <GetUsers/>

          <h2>Users</h2>

          <select>
            <option value="ADMIN">Admin</option>
            <option value="ADMIN">Broker</option>
            <option value="ADVISOR">Advisor</option>
          </select>

          <button onClick={()=>GetUsers()}>Get users</button>

          <ul>
            <li>
              John <strong>Admin</strong>
            </li>
            <li>
              Mary <strong>Admin</strong>
            </li>
          </ul>
        </header>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;

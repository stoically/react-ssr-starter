import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import { apolloClient } from "../apollo";
import { App } from "./components/App";

const element = document.getElementById("app");
const app = (
  <BrowserRouter>
    <ApolloProvider client={apolloClient()}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

if (process.env.NODE_ENV === "production") {
  ReactDOM.hydrate(app, element);
} else {
  ReactDOM.render(app, element);
}

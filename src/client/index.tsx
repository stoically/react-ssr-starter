import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import { apollo } from "./apollo";
import { App } from "./components/App";

const element = document.getElementById("app");
const app = (
  <BrowserRouter>
    <ApolloProvider client={apollo()}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

if (process.env.NODE_ENV === "production") {
  // https://reactjs.org/docs/react-dom.html#hydrate
  ReactDOM.hydrate(app, element);
} else {
  ReactDOM.render(app, element);
}

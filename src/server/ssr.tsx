import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import fetch from "node-fetch";
import React from "react";
import ReactDOM from "react-dom/server";
import { StaticRouterContext } from "react-router";
import { StaticRouter } from "react-router-dom";
import { Request, Response } from "express";
import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";

import { apolloClient } from "../apollo";
import { App } from "../client/components/App";

const templatePath = path.join(__dirname, "..", "client", "index.html");
const HTML_TEMPLATE = fs.readFileSync(templatePath).toString();

export default async (req: Request, res: Response): Promise<void> => {
  const client = apolloClient({ fetch, ssrMode: true });
  const context: StaticRouterContext = {};
  const router = (
    <StaticRouter location={req.originalUrl} context={context}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StaticRouter>
  );

  await getDataFromTree(router);
  const markup = ReactDOM.renderToString(router);
  const initialState = client.extract();

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    const $ = cheerio.load(HTML_TEMPLATE);
    $("#app").html(markup);
    $("head").append(
      `<script>window.__APOLLO_STATE__= ${JSON.stringify(initialState).replace(
        /</g,
        "\\u003c"
      )};</script>`
    );

    res.send($.html());
  }
};
